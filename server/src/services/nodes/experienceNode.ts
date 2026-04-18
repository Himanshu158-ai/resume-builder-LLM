import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { cohereChat } from "../../models/llm.models";


export const GenExperienceNode: GraphNode<typeof state> = async (state) => {
  const { experience, skills } = state;

  const enhancedExperience = [];

  for (const exp of experience) {
    const prompt = `
You are a professional ATS resume writer.

EXPERIENCE:
Role: ${exp.role}
Company: ${exp.company}
Duration: ${exp.duration}
Description: ${exp.description}
Skills: ${skills.join(", ")}

TASK:
Write 3 bullet points for this work experience.

RULES:
- Start each bullet with a strong action verb (Built, Developed, Implemented, Designed, Contributed, Worked)
- Maximum 12-14 words per bullet
- Naturally include relevant skills from the skills list
- If user has mentioned any numbers/metrics in description → use them
- If user has NOT mentioned any numbers → do NOT add any, just describe the work clearly
- No soft skills, no fluff, no fake metrics

STRICT RULE:
Never invent or estimate numbers, percentages, or metrics.
Only use what user has explicitly provided in description.
ATS optimization = right keywords, not fake numbers.

OUTPUT:
Return ONLY a valid JSON array of 3 strings.
Example: ["Built reusable React components...", "Developed REST APIs..."]
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

    enhancedExperience.push({
      ...exp,
      points: points, // ✅ description → points array
    });
  }

  return {
    experience: enhancedExperience,
  };
};