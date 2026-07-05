import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { googleChat } from "../../models/llm.models";

export const GenAboutNode: GraphNode<typeof state> = async (state) => {
  const { personalInfo, aboutMe, education, experience, skills, projects, isFresher } = state;

  const prompt = `
You are a professional ATS resume writer.

CANDIDATE PROFILE:
About: ${aboutMe.map(a => a.about).join(", ") || "Not provided"}
Target Role: ${aboutMe.map(a => a.target).join(", ") || "Not provided"}
Skills: ${Object.entries(skills)
      .map(([cat, list]) => list.length ? `${cat}: ${list.join(", ")}` : null)
      .filter(Boolean)
      .join(" | ") || "Not provided"}
Projects: ${projects.map(p => p.name).join(", ") || "Not provided"}
${!isFresher
      ? `Experience: ${experience.map(e => `${e.role} at ${e.company}`).join(", ") || "Not provided"}`
      : "Fresher — no work experience"}
${education?.cgpa >= 7.5 ? `CGPA: ${education.cgpa}` : ""}

TASK:
Write a 3-4 line professional summary for a resume, using ONLY the data given above.

HARD RULES (violating these = failed output):
- Do NOT start the summary with the candidate's name — start directly with the role/title
- Do NOT mention the candidate's name anywhere in the summary (it already appears in the resume header)
- Do NOT invent job titles, roles, companies, technologies, metrics, numbers, years of experience, or achievements not explicitly listed above
- Copy numeric values (CGPA, etc.) EXACTLY as given — do not round, approximate, or alter them
- Do NOT assume seniority (e.g. do not call a fresher "experienced" or imply years of expertise)
- If Target Role is "Not provided", infer ONLY from the listed skills/projects
- If a field is "Not provided", simply skip it — do not mention its absence
- Every skill, project, or fact mentioned in the summary MUST appear verbatim in the profile above

PROJECT/EXPERIENCE HANDLING:
- Do NOT describe what a project does, its functionality, tech stack, or its impact
- Only mention the project NAME(s) as a high-level reference
- This section is a brief OVERVIEW only, not a detailed breakdown

WRITING RULES:
- Third person, implicit subject — no "I/me/my", no name
- For freshers: focus on skills, project names (overview only), and CGPA (if 7.5+)
- For experienced: focus on role/company names (overview only) and skills
- Naturally weave in 3-5 relevant keywords from Skills for ATS matching
- Avoid generic filler: no "passionate", "hardworking", "team player", "detail-oriented", "results-driven", "dynamic professional"
- No bullet points, no markdown, no headings

OUTPUT FORMAT:
Return ONLY the summary paragraph as plain text. No preamble, no labels, no quotes.
`;

  const response = await googleChat.invoke(prompt);

  const content =
    typeof response.content === "string"
      ? response.content
      : response.content.map(c => ("text" in c ? c.text : "")).join("");

  return {
    aboutMe: [{ about: content.trim(), target: state.aboutMe[0].target }]
  };
};
