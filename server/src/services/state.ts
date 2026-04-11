import { StateSchema } from "@langchain/langgraph"
import { z } from "zod";

export const state = new StateSchema({
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
