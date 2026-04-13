// import { Annotation, messagesStateReducer } from "@langchain/langgraph";
// import { z } from "zod";

// export const state = Annotation.Root({
//   personalInfo: Annotation<{
//     name: string;
//     email: string;
//     phone: string;
//     location: string;
//     linkedin: string;
//     github: string;
//   }>(),

//   aboutMe: Annotation<{ about: string; target: string }[]>({
//     reducer: (prev, next) => next, // latest override karega
//     default: () => [],
//   }),

//   experience: Annotation<{
//     company: string;
//     role: string;
//     duration: string;
//     description: string;
//     points: string[];
//   }[]>({
//     reducer: (prev, next) => next,
//     default: () => [],
//   }),

//   projects: Annotation<{
//     name: string;
//     techStack: string;
//     description: string;
//     points: string[];
//   }[]>({
//     reducer: (prev, next) => next,
//     default: () => [],
//   }),

//   skills: Annotation<string[]>({
//     reducer: (prev, next) => next,
//     default: () => [],
//   }),

//   education: Annotation<{
//     college: string;
//     degree: string;
//     branch: string;
//     year: string;
//     cgpa: string;
//   }>(),

//   isFresher: Annotation<boolean>({
//     reducer: (prev, next) => next,
//     default: () => false,
//   }),

//   suggestions: Annotation<string[]>({
//     reducer: (prev, next) => next,
//     default: () => [],
//   }),

//   finalReview: Annotation<string>({
//     reducer: (prev, next) => next,
//     default: () => "",
//   }),
// });


import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { z } from "zod";

// --------------------
// ZOD SCHEMAS (validation)
// --------------------

export const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  description: z.string(),
  points: z.array(z.string()).optional(),
});

export const projectSchema = z.object({
  name: z.string(),
  techStack: z.string(),
  description: z.string(),
  points: z.array(z.string()).optional(),
});

// --------------------
// STATE
// --------------------

export const state = Annotation.Root({
  // --------------------
  // PERSONAL INFO
  // --------------------
  personalInfo: Annotation<{
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  }>({
    reducer: (prev, next) => next,
    default: () => ({
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    }),
  }),

  // --------------------
  // ABOUT
  // --------------------
  aboutMe: Annotation<{ about: string; target: string }[]>({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  // --------------------
  // EXPERIENCE
  // --------------------
  experience: Annotation<
    {
      company: string;
      role: string;
      duration: string;
      description: string;
      points?: string[];
    }[]
  >({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  // --------------------
  // PROJECTS
  // --------------------
  projects: Annotation<
    {
      name: string;
      techStack: string;
      description: string;
      points?: string[];
    }[]
  >({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  // --------------------
  // SKILLS
  // --------------------
  skills: Annotation<string[]>({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  // --------------------
  // EDUCATION
  // --------------------
  education: Annotation<{
    college: string;
    degree: string;
    branch: string;
    year: string;
    cgpa: number;
  }>({
    reducer: (prev, next) => next,
    default: () => ({
      college: "",
      degree: "",
      branch: "",
      year: "",
      cgpa: 0,
    }),
  }),

  // --------------------
  // FRESHER FLAG
  // --------------------
  isFresher: Annotation<boolean>({
    reducer: (prev, next) => next,
    default: () => false,
  }),

  // --------------------
  // AI OUTPUT
  // --------------------
  suggestions: Annotation<string[]>({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  finalReview: Annotation<string>({
    reducer: (prev, next) => next,
    default: () => "",
  }),

  // --------------------
  // CHAT HISTORY (future use)
  // --------------------
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),

  // --------------------
  // META (PRO FEATURE)
  // --------------------
  meta: Annotation<{
    tokensUsed: number;
    lastUpdated: string;
  }>({
    reducer: (prev, next) => ({ ...prev, ...next }),
    default: () => ({
      tokensUsed: 0,
      lastUpdated: new Date().toISOString(),
    }),
  }),
});