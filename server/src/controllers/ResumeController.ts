import { Request, Response } from "express";
import runResumeAgent from "../services/graph";

export const generateResume = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await runResumeAgent(data);
        res.status(200).json({ success: true, ...data, ...result, message: "Resume generated successfully." });

    } catch (error) {
        console.error("Resume Route Error:", error);
        res.status(500).json({ success: false, message: "Resume generation failed." });
    }
};