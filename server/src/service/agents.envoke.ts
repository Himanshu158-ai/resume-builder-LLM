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

    aboutMe: z.string().default(""),//cohere

    education: z.object({
        college: z.string().default(""),
        degree: z.string().default(""),
        branch: z.string().default(""),
        year: z.string().default(""),
        cgpa: z.string().default(""),
    }),

    experience: z.array(z.object({//cohere
        company: z.string().default(""),
        role: z.string().default(""),
        duration: z.string().default(""),
        description: z.string().default(""),
    })).default([]),

    skills: z.array(z.string()).default([]),

    projects: z.array(z.object({//gemini
        name: z.string().default(""),
        techStack: z.string().default(""),
        description: z.string().default(""),
    })).default([]),

    isFresher: z.boolean().default(false),

    finalReview: z.string().default('0'),//mistral
});

const GenAboutNode: GraphNode<typeof state> = async (state) => {
    const { personalInfo, aboutMe, education, experience, skills, projects, isFresher } = state;

    const prompt = `
You are a senior ATS resume optimization expert.

Your task is to generate a highly ATS-optimized PROFESSIONAL SUMMARY.

INPUT DATA:
Name: ${personalInfo.name}
About: ${aboutMe}
Education: ${JSON.stringify(education)}
Skills: ${skills.join(", ")}
Projects: ${JSON.stringify(projects)}
${!isFresher ? `Experience: ${JSON.stringify(experience)}` : "Candidate is a Fresher"}

STRICT REQUIREMENTS:
- Output ONLY the Professional Summary paragraph
- Length: 3–4 lines maximum
- Must be ATS optimized with strong industry keywords
- Naturally include skills: ${skills.join(", ")}
- Mention role target (e.g., Full Stack Developer / MERN Developer etc.)
- Focus on projects + skills instead of work experience if candidate is fresher.
- Highlight academic excellence, hands-on projects, and technical stack strength.
- Highlight impact, performance, scalability, or problem solving
- Use strong professional tone (no fluff, no generic phrases)
- Do NOT use bullet points
- Do NOT include headings
- Do NOT include markdown
- Write in third person professional resume tone

ATS OPTIMIZATION RULES:
- Include technical keywords
- Include action-driven language
- Include domain relevance (web dev, backend, frontend etc.)
- Avoid "I", "my", "me"
- Keep concise and recruiter friendly

Return ONLY the professional summary text.
`;

    const response = await cohereChat.invoke(prompt);

    const content =
        typeof response.content === "string"
            ? response.content
            : response.content.map(c => ("text" in c ? c.text : "")).join("");

    return {
        ...state,
        aboutMe: content.trim()
    };
};

const GenExperienceNode: GraphNode<typeof state> = async (state) => {
  const { experience, skills } = state;

  const enhancedExperience = [];

  for (const exp of experience) {
    const prompt = `
You are an ATS resume optimization expert.

Rewrite the following work experience to be highly ATS-friendly.

Role: ${exp.role}
Company: ${exp.company}
Duration: ${exp.duration}
Description: ${exp.description}

Skills: ${skills.join(", ")}

REQUIREMENTS:
- Convert into 3–4 strong bullet points
- Start each bullet with action verbs
- ATS optimized
- Professional resume tone
- No headings

Return only bullet points.
`;

    const res = await cohereChat.invoke(prompt);

    const content =
      typeof res.content === "string"
        ? res.content
        : res.content.map(c => ("text" in c ? c.text : "")).join("");

    enhancedExperience.push({
      ...exp,
      description: content.trim()
    });
  }

  return {
    ...state,
    experience: enhancedExperience
  };
};

const GenProjectsNode: GraphNode<typeof state> = async (state) => {
  const { projects, skills } = state;

  const enhancedProjects = [];

  for (const project of projects) {
    const prompt = `
You are an ATS resume optimization expert.

Rewrite the following project description to be highly ATS-friendly.

Project Name: ${project.name}
Tech Stack: ${project.techStack}
Description: ${project.description}

Skills: ${skills.join(", ")}

REQUIREMENTS:
- Convert into 3–4 strong bullet points
- Start each bullet with action verbs
- Include technical keywords
- Focus on impact, performance, architecture
- Keep concise and professional
- Do NOT add headings
- Do NOT add markdown formatting
- Return ONLY bullet points

Return format:
- bullet 1
- bullet 2
- bullet 3
`;

    const res = await googleChat.invoke(prompt);

    const content =
      typeof res.content === "string"
        ? res.content
        : res.content.map(c => ("text" in c ? c.text : "")).join("");

    enhancedProjects.push({
      ...project,
      description: content.trim()
    });
  }

  return {
    ...state,
    projects: enhancedProjects
  };
};

const FinalNode: GraphNode<typeof state> = async (state) => {
  const { aboutMe, experience, projects, skills } = state;

  const prompt = `
You are a senior ATS resume reviewer.

Your task:
1. Review Professional Summary, Experience, and Projects
2. Fix grammar, clarity, ATS keywords
3. Improve weak bullet points
4. Keep same structure
5. Make resume 100% ATS friendly

INPUT:

PROFESSIONAL SUMMARY:
${aboutMe}

EXPERIENCE:
${JSON.stringify(experience)}

PROJECTS:
${JSON.stringify(projects)}

SKILLS:
${skills.join(", ")}

REQUIREMENTS:
- Improve content but DO NOT invent fake experience
- Keep bullet points format
- Use strong action verbs
- Add ATS keywords naturally
- Keep professional tone
- Keep concise

RETURN STRICT JSON:

{
"about": "corrected summary",
"experience": [ corrected experience array ],
"projects": [ corrected projects array ],
"score": number (1-10)
}

Score rules:
9-10 = excellent ATS ready
7-8 = good but minor fixes
5-6 = average
below 5 = poor
`;

  const res = await mistralChat.invoke(prompt);

  const content =
    typeof res.content === "string"
      ? res.content
      : res.content.map(c => ("text" in c ? c.text : "")).join("");

  let parsed;

  try {
    parsed = JSON.parse(content);
  } catch {
    return state;
  }

  return {
    ...state,
    aboutMe: parsed.about,
    experience: parsed.experience,
    projects: parsed.projects,
    finalReview: String(parsed.score)
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


    .compile();



export default async function runResumeAgent(userData: any) {
    console.log("Starting Resume Generation Graph...");

    try {
        const start = Date.now();

        const result = await graph.invoke(userData);

        console.log("Resume Graph Execution Completed!");
        console.log("Execution time:", Date.now() - start, "ms");
        console.log("Final Graph Result:", result);

        return {
            aboutMe: result.aboutMe || userData.aboutMe || "",
            experience: result.experience || userData.experience || [],
            projects: result.projects || userData.projects || [],
            finalReview: result.finalReview || "0",
        };

    } catch (error) {
        console.error("Failed to execute Resume Graph:", error);
        throw error;
    }
}