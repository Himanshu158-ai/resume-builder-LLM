import { Request, Response } from "express";
import runResumeAgent from "../services/graph";

export const generateResume = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data.personalInfo.name || !data.personalInfo.email || !data.personalInfo.phone || !data.personalInfo.location || !data.personalInfo.linkedin || !data.personalInfo.github || !data.aboutMe[0].about || !data.education.college || !data.education.degree || !data.education.branch || !data.education.year || !data.skills || !data.projects[0].name || !data.projects[0].techStack || !data.projects[0].description) {
            return res.status(400).json({ success: false, message: "Please fill all the fields." });
        }
        const result = await runResumeAgent(data);
        res.status(200).json({ success: true, ...data, ...result, message: "Resume generated successfully." });

    } catch (error) {
        console.error("Resume Route Error:", error);
        res.status(500).json({ success: false, message: "Resume generation failed." });
    }
};