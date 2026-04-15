import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { mistralChat } from "../../models/llm.models";

export const FinalNode: GraphNode<typeof state> = async (state) => {
  const { aboutMe, experience, projects, skills } = state;

  const prompt = `
  You are a world-class ATS resume reviewer and career coach.

  Your task is to do a FINAL quality check and improvement pass on this resume.

  REVIEW CHECKLIST:
  1. Fix grammar, clarity, and professional tone
  2. Strengthen weak bullet points with better action verbs
  3. Add missing ATS keywords naturally on the basis of his/her achivement,skills,experience,projects
  4. Ensure quantified metrics exist in bullet points

  INPUT DATA:

  PROFESSIONAL SUMMARY:
  ${JSON.stringify(aboutMe)}

  EXPERIENCE:
  ${JSON.stringify(experience)}

  PROJECTS:
  ${JSON.stringify(projects)}

  SKILLS:
  ${skills.join(", ")}

  STRICT RULES:
  - DO NOT invent fake experience, projects, or education
  - DO NOT change personal info (name, email, phone, college, CGPA)
  - DO NOT use markdown, asterisks (**), or bold formatting
  - Keep points[] as array of strings — same structure as input
  - Each bullet point must start with strong action verb
  - At least 1-2 metrics per experience/project bullet
  - Professional tone throughout

  OUTPUT FORMAT:
  Return ONLY this valid JSON — no explanation, no preamble, no markdown:

  {
    "about": "improved professional summary string",
    "experience": [
      {
        "company": "same as input",
        "role": "same as input",
        "duration": "same as input",
        "description": "same as input",
        "points": ["improved bullet 1", "improved bullet 2", "improved bullet 3"]
      }
    ],
    "projects": [
      {
        "name": "inhanced name",
        "techStack": "dame but proper formating",
        "description": "same as input",
        "points": ["improved bullet 1", "improved bullet 2", "improved bullet 3"]
      }
    ],
    "finalReview": "8.5"
  }
  `;

  const res = await mistralChat.invoke(prompt);

  const content =
    typeof res.content === "string"
      ? res.content
      : res.content.map((c) => ("text" in c ? c.text : "")).join("");

  // ✅ Backticks strip karo
  const cleaned = content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  let parsed: any;

  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON parse failed:", cleaned); // ✅ Ab dekh payega kya aa raha hai
    return state;
  }

  return {
    ...state,
    aboutMe: parsed.about
      ? [{ about: parsed.about, target: state.aboutMe[0]?.target || "" }]
      : state.aboutMe,
    experience: parsed.experience ?? state.experience,
    projects: parsed.projects ?? state.projects,
    finalReview: String(parsed.finalReview ?? ""),
  };
};
