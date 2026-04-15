# 🤖 AI Resume Builder (Multi-LLM + LangGraph)

An intelligent AI-powered Resume Builder that generates professional, ATS-friendly resumes using multiple Large Language Models (LLMs). This project leverages LangGraph to orchestrate and manage LLM workflows efficiently.

---

## 📌 Features

- 🧠 Multi-LLM Support (e.g., OpenAI, Mistral, etc.)
- 🔗 Built using LangGraph for structured LLM workflows
- 📄 Generates ATS-friendly resumes
- 📥 Download resume as PDF
- 🧩 Modular and scalable architecture
- 🌐 Works across devices (mobile + desktop)

---

## 🛠️ Tech Stack

- Frontend: React.js
- Backend: Node.js / Express
- AI Orchestration: LangGraph
- LLMs: Gemini, Mistral, Cohere (and more)
- Styling: tailwindCSS / Styled Components

---

## 🧠 How It Works

1. User inputs details (education, skills, experience, project)
2. Data is passed into LangGraph workflow
3. Multiple LLMs process different sections:
   - Summary Generation
   - Experience Enhancement
   - project Enhancement
   - Optimze Ats-friendly
4. LangGraph manages flow between nodes
5. Final structured resume is generated
6. User can preview and download as PDF

---

## 🔄 LangGraph Workflow (Concept)

User Input → Preprocessing → LLM Nodes → Resume Formatter → Output

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
