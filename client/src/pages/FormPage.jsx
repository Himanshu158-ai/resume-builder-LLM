import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Project";
import Experience from "../components/Experience";
import About from "../components/About";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL
import Loader from "../components/Loader";

const defaultData = {
  personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  aboutMe: [{ about: "", target: "" }],
  education: { college: "", degree: "", branch: "", year: "", cgpa: "" },
  skills: [],
  projects: [{ name: "", techStack: "", description: "" }],
  experience: [{ company: "", role: "", duration: "", description: "" }],
  isFresher: false,
};


const steps = [
  { label: "Personal Info", title: "Let's start with the basics", sub: "Your name, contact, and links the essentials recruiters look for first." },
  { label: "Background", title: "Tell us about yourself", sub: "A quick intro and your target role helps the AI personalize your resume." },
  { label: "Education", title: "Your academic background", sub: "Add your degree, institution, and results." },
  { label: "Skills", title: "What do you bring to the table?", sub: "Add your technical and professional skills be specific." },
  { label: "Projects", title: "Showcase what you've built", sub: "Projects speak louder than words. Add your best work." },
  { label: "Experience", title: "Your work experience", sub: "Internships, jobs, freelance anything relevant counts." },
];

export default function FormPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    console.log(data);
    try {
      const res = await axios.post(API_URL + "/api/resume/generate", data, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Resume generated successfully!");
      console.log(res.data);
      navigate("/preview", { state: { resume: res.data } });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    <PersonalInfo data={data} setData={setData} />,
    <About data={data} setData={setData} />,
    <Education data={data} setData={setData} />,
    <Skills data={data} setData={setData} />,
    <Projects data={data} setData={setData} />,
    <Experience data={data} setData={setData} />,
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-16 px-4">
      {loading ? (<Loader />) : (
        <div className="max-w-2xl mx-auto">

          {/* Heading */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/[0.08] border border-indigo-500/20 px-3 py-1.5 rounded-full mb-5">
              <span className="text-[11px] font-medium text-indigo-300 tracking-widest uppercase">Resume Builder</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
              Build your resume
            </h1>
            <p className="text-[#71717A] text-sm leading-relaxed">
              Describe yourself our agents build your resume from your actual achievements.
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5 mb-10">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500
        ${i < current
                    ? "bg-indigo-500"
                    : i === current
                      ? "bg-indigo-400/60"
                      : "bg-white/[0.08]"
                  }`}
              />
            ))}
          </div>

          {/* Card */}
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-8 mb-6">

            {/* Step label */}
            <p className="text-[10px] uppercase tracking-[0.12em] text-indigo-400 font-semibold mb-3">
              Step {current + 1} of {steps.length} - {steps[current].label}
            </p>
            <h2 className="text-[20px] font-bold text-white tracking-tight leading-snug mb-1">
              {steps[current].title}
            </h2>
            <p className="text-[12px] text-[#71717A] mb-7 pb-6 border-b border-white/[0.06]">
              {steps[current].sub}
            </p>

            {sections[current]}

          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">

            <button
              onClick={() => setCurrent(c => c - 1)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm
            bg-white/[0.04] hover:bg-white/[0.07]
            border border-white/[0.08]
            text-[#A1A1AA] hover:text-white
            rounded-lg transition-all duration-200
            ${current === 0 ? "invisible" : ""}`}
            >
              ← Back
            </button>

            <span className="text-[12px] text-[#71717A] tabular-nums">
              {current + 1} / {steps.length}
            </span>

            {current < steps.length - 1 ? (
              <button
                onClick={() => setCurrent(c => c + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold
              bg-indigo-600 hover:bg-indigo-500
              text-white rounded-lg
              transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold
              bg-emerald-600 hover:bg-emerald-500
              text-white rounded-lg
              transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0
              disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Generating...
                  </>
                ) : "Generate Resume →"}
              </button>
            )}

          </div>

        </div>
      )}
    </div>
  );
}