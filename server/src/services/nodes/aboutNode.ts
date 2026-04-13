import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { googleChat } from "../../models/llm.models";

export const GenAboutNode: GraphNode<typeof state> = async (state) => {
  const { personalInfo, aboutMe, education, experience, skills, projects, isFresher } = state;

  const prompt = `
You are a world-class ATS resume writer trusted by Fortune 500 recruiters.

Your task is to craft a razor-sharp, ATS-optimized Professional Summary that makes recruiters stop scrolling.

CANDIDATE PROFILE:
Name: ${personalInfo.name}
About (raw input): ${aboutMe.map(a => a.about).join(", ")}
Target Role: ${aboutMe.map(a => a.target).join(", ")}
Education: ${JSON.stringify(education)}
Skills: ${skills.join(", ")}
Projects: ${JSON.stringify(projects)}
${!isFresher ? `Experience: ${JSON.stringify(experience)}` : "Candidate is a Fresher — focus on projects, skills, and academic excellence"}

CORE INSTRUCTION:
- If Target Role is provided → tailor the summary toward that role
- Align skills, projects, and experience with the Target Role
- Emphasize only relevant technologies for that role
- Naturally include role-specific keywords for ATS
- DO NOT rely only on target role — use actual skills, projects, and experience
- If Target Role is empty → generate a strong general professional summary based on skills, projects, and experience (current behavior)

WRITING RULES:
- 3-4 lines MAXIMUM — tight, punchy, no filler
- Third person professional tone (no I, me, my)
- If Target Role exists → open with that role identity
  Example: "Frontend Developer...", "Backend Java Developer..."
- If Target Role missing → infer best role from skills/projects
- Naturally weave in: ${skills.join(", ")}
- Mention 1-2 standout projects or achievements with impact
- If fresher → highlight academic excellence + project depth + tech stack strength
- If experienced → highlight years, impact, and domain expertise
- End with value proposition (what they bring to the team)

ATS RULES:
- If Target Role exists → include role-specific keywords for that job
- Also include high-value keywords from: ${skills.join(", ")}
- Use action-driven, results-oriented language
- Include domain terms (scalable, REST API, frontend, backend, etc.)
- No buzzwords (passionate, hardworking, team player)
- No bullet points, no headings, no markdown
- if ${education.cgpa} like less than 7.5 or 7 ignore it

STRICT OUTPUT:
Return ONLY the professional summary paragraph.
Nothing else — no explanation, no label, no preamble.
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
