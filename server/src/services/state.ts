import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { z } from "zod";

export const state = Annotation.Root({
  personalInfo: Annotation<{
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  }>(),

  aboutMe: Annotation<{ about: string; target: string }[]>({
    reducer: (prev, next) => next, // latest override karega
    default: () => [],
  }),

  experience: Annotation<{
    company: string;
    role: string;
    duration: string;
    description: string;
    points: string[];
  }[]>({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  projects: Annotation<{
    name: string;
    techStack: string;
    description: string;
    points: string[];
  }[]>({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  skills: Annotation<string[]>({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  education: Annotation<{
    college: string;
    degree: string;
    branch: string;
    year: string;
    cgpa: string;
  }>(),

  isFresher: Annotation<boolean>({
    reducer: (prev, next) => next,
    default: () => false,
  }),

  suggestions: Annotation<string[]>({
    reducer: (prev, next) => next,
    default: () => [],
  }),

  finalReview: Annotation<string>({
    reducer: (prev, next) => next,
    default: () => "",
  }),
});