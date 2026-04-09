import express from "express";
import { config } from "./config/config";
import runResumeAgent from "./service/agents.envoke";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.post("/api/generate", async (req, res) => {


    try {
        const data = req.body;
        console.log("Invoking Resume generative agent with fake data...");
        // Run the agent
        const result = await runResumeAgent(data);
        // Return output
        res.status(200).json({ success: true, ...data, ...result });

    } catch (error) {
        console.error("Test Route Error:", error);
        res.status(500).json({ success: false, message: "Server Agent execution failed." });
    }
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});