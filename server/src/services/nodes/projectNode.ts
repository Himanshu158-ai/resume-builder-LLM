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
Description: ${project.description}
Skills: ${skills.join(", ")}

TASK:
Write 3-4 bullet points for this project.

CONTENT RULES:
- Enhance what user has described — do NOT add anything user has not mentioned
- Only use technologies user has listed in Tech Stack
- Focus on: WHAT was built + HOW it works
${hasRealWorldUsage ? `- User has mentioned real-world usage → highlight this with strong emphasis
  Example: "Actively deployed in college environment helping fresher students build resumes"` : ""}
${hasUseCase ? `- User has mentioned a use case or potential impact → highlight that naturally
  Example: "Streamlines manager workflow by automating email composition and delivery"` : ""}

METRICS RULE:
- If user has mentioned numbers/metrics → use them other wise do not invent any
- Convert real impact to qualitative if no numbers given
  Example: "saves time" → "reduces manual effort for leadership"
  NOT → "saves 40% time" (never do this)

WRITING RULES:
- Start each bullet with strong action verb
- Maximum 15 words per bullet
- Only include tech stack user provided
- No soft skills, no fluff, no fake metrics

STRICT RULE:
Never invent numbers, percentages, or metrics.
Never add technologies not mentioned in Tech Stack.
Only enhance what user has explicitly provided.

OUTPUT:
Return ONLY a valid JSON array of 3-4 strings.
No markdown, no explanation, nothing else.
`;

    const res = await cohereChat.invoke(prompt);

    const content =
      typeof res.content === "string"
        ? res.content
        : res.content.map(c => ("text" in c ? c.text : "")).join("");

    // ✅ JSON parse with fallback
    let points: string[] = [];
    try {
      points = JSON.parse(content.trim());
    } catch {
      points = content
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "");
    }

    enhancedProjects.push({
      ...project,
      points: points, // ✅ description → points array
    });
  }

  return {
    projects: enhancedProjects,
  };
};