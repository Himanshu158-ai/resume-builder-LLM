import { GraphNode } from "@langchain/langgraph";
import { state } from "../state";
import { mistralChat } from "../../models/llm.models";

export const FinalNode: GraphNode<typeof state> = async (state) => {
  const { aboutMe, experience, projects, skills } = state;

  const prompt = `
You are a professional ATS resume reviewer doing a FINAL consistency pass.

The content below has ALREADY been written and enhanced. Your job is NOT to rewrite everything — only fix small issues, generate the job title, and give a final review.

INPUT DATA:

PROFESSIONAL SUMMARY:
${JSON.stringify(aboutMe)}

EXPERIENCE:
${JSON.stringify(experience)}

PROJECTS:
${JSON.stringify(projects)}

SKILLS:
${Object.entries(skills)
      .map(([cat, list]) => list.length ? `${cat}: ${list.join(", ")}` : null)
      .filter(Boolean)
      .join(" | ")}

REVIEW CHECKLIST (light touch only):
1. Fix ONLY grammar/spelling errors, if any
2. If a bullet is missing a strong action verb at the start, fix ONLY that
3. Do NOT rewrite bullets that are already fine — leave them untouched
4. Do NOT change project names or company/role/duration
5. Do NOT add, remove, or estimate numbers/metrics
6. Keep each bullet under 15 words

JOB TITLE TASK:
Generate one sharp 2-5 word job title based on skills, projects, and experience.
Examples: "MERN Stack Developer", "Full Stack Developer | AI Integration", "React Developer | GenAI"
No buzzwords.

FINAL REVIEW TASK:
Score this resume out of 10 using this EXACT rubric (add up the points):

1. ATS Keyword Alignment (0-3 points):
   - 3 = Skills/keywords naturally match target role, well-distributed
   - 2 = Decent keyword presence but some gaps
   - 1 = Minimal keyword alignment
   - 0 = No clear keyword strategy

2. Bullet Quality & Impact (0-3 points):
   - 3 = All bullets start with strong action verbs, specific, no fluff
   - 2 = Most bullets strong, a few generic ones
   - 1 = Bullets present but weak/vague
   - 0 = Bullets missing or very poor

3. Completeness (0-2 points):
   - 2 = Summary, skills, projects/experience, education all well-filled
   - 1 = One section thin or missing
   - 0 = Multiple sections missing or empty

4. Consistency & Professionalism (0-2 points):
   - 2 = No grammar issues, consistent tone, no invented data
   - 1 = Minor issues
   - 0 = Noticeable errors or inconsistency

Add the 4 sub-scores for a total out of 10.
Return format: "X"

ABSOLUTE RULE:
You are a light editor, NOT a rewriter or data inventor.
If content is already correct, return it UNCHANGED.
Never fabricate achievements, numbers, or metrics.

OUTPUT FORMAT:
Return ONLY this valid JSON — no explanation, no preamble, no markdown, no code fences:

{
  "about": "string (unchanged unless grammar fix needed)",
  "experience": [
    { "points": ["bullet 1", "bullet 2", "bullet 3"] }
  ],
  "projects": [
    { "points": ["bullet 1", "bullet 2", "bullet 3"] }
  ],
  "jobTitle": "MERN Stack Developer | AI Integration",
  "finalReview": "7"
}
`;

  const res = await mistralChat.invoke(prompt);

  const content =
    typeof res.content === "string"
      ? res.content
      : res.content.map((c) => ("text" in c ? c.text : "")).join("");

  const cleaned = content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  let parsed: any;

  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON parse failed:", cleaned);
    return state; // fallback: no changes, original data safe
  }

  const finalExperience = parsed.experience
    ? experience.map((exp, i) => ({
      ...exp,
      points: parsed.experience[i]?.points ?? exp.points,
    }))
    : experience;

  const finalProjects = parsed.projects
    ? projects.map((proj, i) => ({
      ...proj,
      points: parsed.projects[i]?.points ?? proj.points,
    }))
    : projects;

  return {
    ...state,
    aboutMe: parsed.about
      ? [{ about: parsed.about, target: aboutMe[0]?.target || "" }]
      : aboutMe,
    experience: finalExperience,
    projects: finalProjects,
    jobTitle: parsed.jobTitle ?? state.jobTitle,
    finalReview: parsed.finalReview ?? state.finalReview,
  };
};