import express from "express";
import { config } from "./config/config";
import ResumeRoute from "./routes/ResumeRoute";
import cors from "cors";
import { Request, Response } from "express";


const app = express();
app.use(express.json());

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? [process.env.CLIENT_URL]
        : ["http://localhost:5173", "http://127.0.0.1:5173"]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))


app.use("/api/resume", ResumeRoute);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});