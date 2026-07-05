import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { cohereChat } from "../../models/llm.models";

export const GenProjectsNode: GraphNode<typeof state> = async (state) => {
  const { projects, skills } = state;

  const enhancedProjects = [];

  for (const project of projects) {
    const hasRealWorldUsage = project.description.toLowerCase().match(
      /college|company|team|client|deployed|production|users|use ho|chal raha|live/i
    );

    const hasUseCase = project.description.toLowerCase().match(
      /can be used|use case|helpful for|designed for|target|purpose|save|reduce|improve/i
    );

    const prompt = `
You are a professional ATS resume writer.

PROJECT:
Name: ${project.name}
Tech Stack: ${project.techStack}
Description (as provided by user): ${project.description}

TASK:
Write 3-4 bullet points for this project, based STRICTLY on the Description and Tech Stack above.

CONTENT RULES:
- Read the description carefully — understand WHAT was built, HOW it works, and WHY it was built
- Every bullet must be SPECIFIC to this project — do NOT write generic bullets that could apply to any project
- Each bullet must highlight a DIFFERENT aspect: architecture, features, tech integration, real-world usage
- Only use technologies explicitly listed in Tech Stack — never add extra, never pull from unrelated context
- Enhance the language — do NOT change the meaning or add anything not mentioned

UNIQUENESS RULE:
- Each bullet must highlight a DIFFERENT aspect of the project
- Do NOT repeat the same idea in multiple bullets
- Cover a mix of: what was built, how it works, key features, real-world usage
- Let the project description guide the structure naturally
${hasRealWorldUsage ? `- Last bullet → real-world deployment/usage — highlight this strongly, ONLY if description clearly states it is actually deployed/used (not planned or in-progress)
  Example: "Deployed in college environment to help fresher students build professional resumes"
  NOT: "Actively deployed" — just use direct verb` : ""}
${hasUseCase ? `- Highlight the use case or impact naturally in one bullet
  Example: "Streamlines manager workflow by automating email composition and recipient lookup"` : ""}

METRICS RULE:
- If user mentioned numbers → use them
- If user did NOT mention numbers → do NOT invent any
- Convert qualitative impact naturally
  Example: "saves time for leadership" → "reduces manual effort for corporate leadership"
  NEVER → "saves 40% time" or any invented percentage

WRITING RULES:
- Start each bullet with strong direct action verb
- NEVER use "Actively" as prefix — just use the verb directly
- Maximum 15 words per bullet
- No soft skills, no fluff, no fake metrics
- No repeated sentence structures across bullets

STRICT RULE:
Never invent numbers, percentages, or metrics.
Never add technologies not mentioned in Tech Stack.
Never write bullets that could belong to any other project.
Only enhance what user has explicitly provided.

OUTPUT FORMAT:
Return ONLY a raw JSON array of 3-4 strings. No markdown, no code fences, no explanation.
`;

    const res = await cohereChat.invoke(prompt);

    const content =
      typeof res.content === "string"
        ? res.content
        : res.content.map(c => ("text" in c ? c.text : "")).join("");

    // strip markdown code fences if present
    const cleaned = content
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let points: string[] = [];
    try {
      const parsed = JSON.parse(cleaned);
      points = Array.isArray(parsed) ? parsed.map(p => String(p).trim()) : [];
    } catch {
      points = cleaned
        .split("\n")
        .map(line => line.replace(/^[-*•\d.]+\s*/, "").replace(/^["']|["'],?$/g, "").trim())
        .filter(line => line.length > 0);
    }

    if (points.length === 0) {
      points = ["Content generation failed — please regenerate this section."];
    }

    enhancedProjects.push({
      ...project,
      points,
    });
  }
  return {
    projects: enhancedProjects,
  }
}