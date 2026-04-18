import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { googleChat } from "../../models/llm.models";

export const GenAboutNode: GraphNode<typeof state> = async (state) => {
  const { personalInfo, aboutMe, education, experience, skills, projects, isFresher } = state;

  const prompt = `
You are a professional ATS resume writer.

CANDIDATE PROFILE:
Name: ${personalInfo.name}
About: ${aboutMe.map(a => a.about).join(", ")}
Target Role: ${aboutMe.map(a => a.target).join(", ")}
Skills: ${skills.join(", ")}
Projects: ${projects.map(p => p.name).join(", ")}
${!isFresher
      ? `Experience: ${experience.map(e => `${e.role} at ${e.company}`).join(", ")}`
      : "Fresher — focus on projects and skills"}
${education.cgpa >= 7.5 ? `CGPA: ${education.cgpa}` : ""}

TASK:
Write a 3-4 line professional summary for a resume.

RULES:
- Use third person (no I, me, my)
- Tailor toward Target Role if provided, else infer from skills/projects
- Naturally include relevant keywords from skills and role
- Mention 1-2 project names and what they do (no metrics)
- For freshers: highlight skills, projects, and CGPA if 7.5+
- For experienced: highlight role, skills, and experience
- No buzzwords (passionate, hardworking, team player)
- No bullet points, no markdown, no headings

STRICT RULE:
Only use information provided above.
Do NOT invent numbers, metrics, or achievements.
ATS optimization means correct keywords — not fake data.

Return ONLY the summary paragraph. Nothing else.
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
