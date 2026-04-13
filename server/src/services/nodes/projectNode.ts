import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { cohereChat } from "../../models/llm.models";

export const GenProjectsNode: GraphNode<typeof state> = async (state) => {
  const { projects, skills } = state;

  const enhancedProjects = [];

  for (const project of projects) {
//     const prompt = `
// You are an expert ATS resume writer and career coach.

// Your job is to convert raw project description into powerful, ATS-optimized bullet points that get interviews.

// Project Name: ${project.name}
// Tech Stack: ${project.techStack}
// Raw Description: ${project.description}
// Relevant Skills: ${skills.join(", ")}

// INSTRUCTIONS:
// - Write exactly 3-4 bullet points
// - Keep each bullet point concise — maximum 15-20 words per bullet
// - Each bullet MUST start with a strong action verb (Built, Engineered, Optimized, Developed, Implemented, Reduced, Increased, Designed, Architected, Integrated)
// - MUST include at least 1-2 quantified metrics (%, ms, x faster, users, requests/sec) — if user didn't mention numbers, intelligently estimate realistic ones based on the project
// - Naturally include relevant tech stack and skills
// - Focus on architecture, performance, and real impact
// - Be specific, not generic — reflect what the user actually built
// - ATS-friendly keywords included
// - No soft skills, no fluff, no headings, no preamble

// OUTPUT FORMAT:
// Return ONLY a valid JSON array of strings. No markdown, no explanation.
// Example: ["Designed REST APIs...", "Optimized query performance..."]

// STRICTLY return only the JSON array, nothing else.
// `;

    const systemPrompt = `
Write 3-4 ATS-friendly project bullet points.

- Start with strong action verbs
- Include metrics (estimate if missing)
- Use tech stack & relevant skills
- Focus on impact, performance, architecture
- Be specific, no fluff

Return JSON array only.
`;

    const userPrompt = `
Project: ${project.name}

Tech: ${project.techStack}

Description:
${project.description.slice(0, 150)}

Skills:
${skills.slice(0, 10).join(", ")}
`;

    const res = await cohereChat.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]);

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