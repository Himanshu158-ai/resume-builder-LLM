import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { mistralChat } from "../../models/llm.models";

export const FinalNode: GraphNode<typeof state> = async (state) => {
  const { aboutMe, experience, projects, skills, jobTitle } = state;

  const prompt = `
You are a professional ATS resume reviewer.

Your job is to do a FINAL quality check on this resume.

INPUT DATA:

PROFESSIONAL SUMMARY:
${JSON.stringify(aboutMe)}

EXPERIENCE:
${JSON.stringify(experience)}

PROJECTS:
${JSON.stringify(projects)}

SKILLS:
${skills.join(", ")}

JOB TITLE:
${jobTitle}

REVIEW CHECKLIST:
1. Fix grammar, clarity, and professional tone
2. Strengthen weak bullet points with better action verbs
3. Ensure relevant tech keywords from skills are naturally present
4. Remove any buzzwords or soft skills (passionate, hardworking, team player)
5. Make sure every bullet starts with a strong action verb
6. Generate a sharp 2-4 word job title based on skills, projects, and experience


STRICT RULES:
- DO NOT invent, add, or modify any numbers or metrics
- If a bullet has no metrics → keep it without metrics, just improve the language
- If a bullet already has metrics from user input → keep them as is
- DO NOT change personal info (name, email, phone, college, CGPA)
- DO NOT use markdown, asterisks, or bold formatting
- Keep points[] as array of strings — same structure as input
- Only improve language and keywords — nothing else
  - Job title should be specific and role-relevant
- Examples: "MERN Stack Developer", "Full Stack Developer | AI Integration", 
  "React Developer | GenAI", "Backend Node.js Developer"
- Max 4-5 words, no buzzwords

ABSOLUTE RULE:
You are a language enhancer, NOT a data inventor.
Never fabricate achievements, numbers, or metrics.
ATS optimization = correct keywords in correct places.

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
      "name": "enhanced name",
      "techStack": "same but proper formatting",
      "description": "same as input",
      "points": ["improved bullet 1", "improved bullet 2", "improved bullet 3"]
    }
  ],
  "finalReview": "score out of 10",
  "jobTitle": "MERN Stack Developer | AI Integration"
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
    jobTitle: parsed.jobTitle ?? state.jobTitle,
  };
};
