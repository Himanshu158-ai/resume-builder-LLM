import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ResumeRoute from "./routes/ResumeRoute";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.CLIENT_URL as string]
    : ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/api/resume", ResumeRoute);

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});