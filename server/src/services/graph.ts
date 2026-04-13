import { StateGraph, START, END } from "@langchain/langgraph";
import { state } from "./state";
import { GenAboutNode } from "./nodes/aboutNode";
import { GenExperienceNode } from "./nodes/experienceNode";
import { GenProjectsNode } from "./nodes/projectNode";
import { FinalNode } from "./nodes/finalNode";

const graph = new StateGraph(state)
  .addNode("GenAboutNode", GenAboutNode)
  .addNode("GenExperienceNode", GenExperienceNode)
  .addNode("GenProjectsNode", GenProjectsNode)
  .addNode("FinalNode", FinalNode)

  .addEdge(START, "GenAboutNode")
  .addEdge(START,"GenProjectsNode")

  // conditional routing
  .addConditionalEdges(START, (state) => {
    if(!state.isFresher){
      return "GenExperienceNode"
    }else {
      return "FinalNode";
    }
  })


  .addEdge("GenAboutNode","FinalNode")
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
    console.log("Final Graph");

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