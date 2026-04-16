import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ResumeRoute from "./routes/ResumeRoute";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));


app.use("/api/resume", ResumeRoute);

// 👇 health route bhi add kar de
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running ✅");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});