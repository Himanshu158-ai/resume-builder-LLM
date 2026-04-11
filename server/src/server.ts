import express from "express";
import { config } from "./config/config";
import ResumeRoute from "./routes/ResumeRoute";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// app.post("/api/resume",ResumeRoute);
app.use("/api/resume",ResumeRoute);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});