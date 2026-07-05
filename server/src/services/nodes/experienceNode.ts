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
Description (as provided by user): ${exp.description || "Not provided"}

TASK:
Write exactly 3 bullet points for this work experience, based STRICTLY on the Description above.

HARD RULES:
- Do NOT invent responsibilities, tasks, technologies, or achievements not mentioned in the Description.
- Do NOT invent or estimate any numbers, percentages, or metrics — use them ONLY if explicitly present in Description.
- If Description is short or vague, keep bullets short and general — do NOT pad with invented detail.
- If Description is "Not provided", generate bullets ONLY from Role + Company context, staying generic and safe.

WRITING RULES:
- Start each bullet with a strong action verb (Built, Developed, Implemented, Designed, Contributed, Collaborated)
- Maximum 12-14 words per bullet
- No soft skills, no fluff, no buzzwords

OUTPUT FORMAT:
Return ONLY a raw JSON array of exactly 3 strings. No markdown, no code fences, no explanation.
Example: ["Built reusable React components for dashboard UI", "Developed REST APIs for user authentication"]
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