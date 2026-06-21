import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ResumeRoute from "./routes/ResumeRoute";
import { googleChat } from "./models/llm.models";
import {mistralChat} from "./models/llm.models"
import {cohereChat} from "./models/llm.models";
import { config } from "./config/config";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.options("*", cors());


app.use("/api/resume", ResumeRoute);

// 👇 health route
app.get("/", async(req: Request, res: Response) => {
    const result = await googleChat.invoke("Hello, how are you?");
    res.send(result?.text);
});

app.post("/api/check", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  res.json({message: "OK"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});