import express from "express";
import { config } from "./config/config";
import ResumeRoute from "./routes/ResumeRoute";
import cors from "cors";
import { Request, Response } from "express";


const app = express();
app.use(express.json());
app.use(cors({
    origin: config.clientUrl,
    credentials: true
}));


// app.post("/api/resume",ResumeRoute);
app.use("/api/resume",ResumeRoute);

app.get("/",(req:Request,res:Response)=>{
    res.send("Server is running");
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});