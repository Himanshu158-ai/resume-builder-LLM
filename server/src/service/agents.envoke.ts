import { StateGraph, StateSchema, START, END, type GraphNode } from "@langchain/langgraph"
import { z } from "zod";
import { googleChat, cohereChat, mistralChat } from "../models/llm.models";

const state = new StateSchema({
  personalInfo: z.object({
    name: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    location: z.string().default(""),
    linkedin: z.string().default(""),
    github: z.string().default(""),
  }),

  aboutMe: z.array(z.object({
    about: z.string().default(""),
    target: z.string().default(""),
  })).default([]), //cohere

  education: z.object({
    college: z.string().default(""),
    degree: z.string().default(""),
    branch: z.string().default(""),
    year: z.string().default(""),
    cgpa: z.string().default(""),
  }),

  experience: z.array(z.object({
    company: z.string().default(""),
    role: z.string().default(""),
    duration: z.string().default(""),
    description: z.string().default(""), // ✅ user ka raw input
    points: z.array(z.string()).default([]), // ✅ AI generated bullet points
  })).default([]),

  projects: z.array(z.object({
    name: z.string().default(""),
    techStack: z.string().default(""),
    description: z.string().default(""), // ✅ user ka raw input
    points: z.array(z.string()).default([]), // ✅ AI generated bullet points
  })).default([]),

  skills: z.array(z.string()).default([]),

  isFresher: z.boolean().default(false),
  suggestions: z.array(z.string()).default([]),

  finalReview: z.string().default(""),//mistral
});

const GenAboutNode: GraphNode<typeof state> = async (state) => {
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

  const response = await cohereChat.invoke(prompt);

  const content =
    typeof response.content === "string"
      ? response.content
      : response.content.map(c => ("text" in c ? c.text : "")).join("");

  return {
    ...state,
    aboutMe: [{about:content.trim(),target:state.aboutMe[0].target}]
  };
};

const GenExperienceNode: GraphNode<typeof state> = async (state) => {
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

INSTRUCTIONS:
- Write exactly 3-4 bullet points
- Keep each bullet point concise — maximum 15-20 words per bullet
- Each bullet MUST start with a strong action verb (Built, Engineered, Optimized, Developed, Implemented, Reduced, Increased, Designed, Architected, Led)
- MUST include at least 1-2 quantified metrics (%, ms, x faster, users, hours saved) — if user didn't mention numbers, intelligently estimate realistic ones based on the role
- Naturally include relevant skills from the skills list
- Be specific, not generic — reflect what the user actually did
- ATS-friendly keywords included
- No soft skills, no fluff, no headings, no preamble

OUTPUT FORMAT:
Return ONLY a valid JSON array of strings. No markdown, no explanation.
Example: ["Built REST APIs...", "Optimized MongoDB queries..."]

STRICTLY return only the JSON array, nothing else.
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
    ...state,
    experience: enhancedExperience,
  };
};

const GenProjectsNode: GraphNode<typeof state> = async (state) => {
  const { projects, skills } = state;

  const enhancedProjects = [];

  for (const project of projects) {
    const prompt = `
You are an expert ATS resume writer and career coach.

Your job is to convert raw project description into powerful, ATS-optimized bullet points that get interviews.

Project Name: ${project.name}
Tech Stack: ${project.techStack}
Raw Description: ${project.description}
Relevant Skills: ${skills.join(", ")}

INSTRUCTIONS:
- Write exactly 3-4 bullet points
- Keep each bullet point concise — maximum 15-20 words per bullet
- Each bullet MUST start with a strong action verb (Built, Engineered, Optimized, Developed, Implemented, Reduced, Increased, Designed, Architected, Integrated)
- MUST include at least 1-2 quantified metrics (%, ms, x faster, users, requests/sec) — if user didn't mention numbers, intelligently estimate realistic ones based on the project
- Naturally include relevant tech stack and skills
- Focus on architecture, performance, and real impact
- Be specific, not generic — reflect what the user actually built
- ATS-friendly keywords included
- No soft skills, no fluff, no headings, no preamble

OUTPUT FORMAT:
Return ONLY a valid JSON array of strings. No markdown, no explanation.
Example: ["Designed REST APIs...", "Optimized query performance..."]

STRICTLY return only the JSON array, nothing else.
`;

    const res = await googleChat.invoke(prompt);

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
    ...state,
    projects: enhancedProjects,
  };
};

const FinalNode: GraphNode<typeof state> = async (state) => {
  const { aboutMe, experience, projects, skills } = state;

const prompt = `
You are a world-class ATS resume reviewer and career coach.

Your task is to do a FINAL quality check and improvement pass on this resume.

REVIEW CHECKLIST:
1. Fix grammar, clarity, and professional tone
2. Strengthen weak bullet points with better action verbs
3. Add missing ATS keywords naturally
4. Ensure quantified metrics exist in bullet points
5. Generate actionable suggestions for candidate improvement

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
  "suggestions": [
    "Actionable tip 1",
    "Actionable tip 2",
    "Actionable tip 3"
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
    suggestions: parsed.suggestions ?? [],
    finalReview: String(parsed.finalReview ?? ""),
  };
};

// Compile and Export Graph
const graph = new StateGraph(state)
  .addNode("GenAboutNode", GenAboutNode)
  .addNode("GenExperienceNode", GenExperienceNode)
  .addNode("GenProjectsNode", GenProjectsNode)
  .addNode("FinalNode", FinalNode)

  .addEdge(START, "GenAboutNode")

  // conditional routing
  .addConditionalEdges("GenAboutNode", (state) => {
    return state.isFresher
      ? "GenProjectsNode"           // fresher skip
      : "GenExperienceNode"; // run experience
  })

  .addEdge("GenExperienceNode", "GenProjectsNode")
  .addEdge("GenProjectsNode", "FinalNode")
  .addEdge("FinalNode", END)


  .compile();



export default async function runResumeAgent(userData: any) {
  console.log("Starting Resume Generation Graph...");

  try {
    const start = Date.now();

    const result = await graph.invoke(userData);

    console.log("Resume Graph Execution Completed!");
    console.log("Execution time:", Date.now() - start, "ms");
    console.log("Final Graph",result);

    return {
      aboutMe: result.aboutMe || userData.aboutMe || [{about:"",target:""}],
      experience: result.experience || userData.experience || [],
      projects: result.projects || userData.projects || [],
      suggestions: result.suggestions || userData.suggestions || [],
      finalReview: result.finalReview || "0",
    };

  } catch (error) {
    console.error("Failed to execute Resume Graph:", error);
    throw error;
  }
}