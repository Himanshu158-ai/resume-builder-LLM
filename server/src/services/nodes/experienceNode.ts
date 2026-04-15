import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { cohereChat } from "../../models/llm.models";


export const GenExperienceNode: GraphNode<typeof state> = async (state) => {
  const { experience, skills } = state;

  const enhancedExperience = [];

  for (const exp of experience) {
    const prompt = `
    You are an expert ATS resume writer and career coach.

    Your job is to convert raw work experience into powerful, ATS-optimized bullet points that get interviews.

    Role: ${exp.role}
    Company: ${exp.company}  
    Duration: ${exp.duration}
    Raw Description: ${exp.description}
    Relevant Skills: ${skills.join(", ")}

    // INSTRUCTIONS:
    // - Write exactly 3-4 bullet points
    // - Keep each bullet point concise — maximum 12-16 words per bullet
    // - Each bullet MUST start with a strong action verb (Built, Engineered, Optimized, Developed, Implemented, Reduced, Increased, Designed, Architected, Led)
    // - MUST include 1-2 quantified metrics (%, ms, x faster, users, hours saved) — if user didn't mention numbers so don't use big numbers, intelligently estimate realistic ones based on the role
    // - Naturally include relevant skills from the skills list
    // - Be specific, not generic — reflect what the user actually did
    // - ATS-friendly keywords included
    // - No soft skills, no fluff, no headings, no preamble

    // OUTPUT FORMAT:
    // Return ONLY a valid JSON array of strings. No markdown, no explanation.
    // Example: ["based on their exprience..", "Optimized MongoDB queries..."]

    // STRICTLY return only the JSON array, nothing else.
    // `;

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