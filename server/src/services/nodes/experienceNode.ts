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

    enhancedExperience.push({
      ...exp,
      points,
    });
  }
  return {
    experience: enhancedExperience,
  };
};