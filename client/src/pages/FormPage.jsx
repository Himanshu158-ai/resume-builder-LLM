import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Project";
import Experience from "../components/Experience";
import About from "../components/About";

const defaultData = {
  personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  aboutMe: [{about:"",target:""}],
  education: { college: "", degree: "", branch: "", year: "", cgpa: "" },
  skills: [],
  projects: [{ name: "", techStack: "", description: "" }],
  experience: [{ company: "", role: "", duration: "", description: "" }],
  isFresher: false,
};

const steps = ["Personal info","background", "Education", "Skills", "Projects", "Experience"];

export default function FormPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    console.log(data);
    try {
      const res = await axios.post("http://localhost:3000/api/resume/generate", data);
      navigate("/preview", { state: { resume: res.data } });
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">

      <div className="max-w-2xl mx-auto">

        {/* heading */}
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">
          Build your resume
        </h1>

        <p className="text-gray-500 mb-8">
          Describe yourself our agent builds your resume from your actual achievements
        </p>

        {/* progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 
              ${i < current
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : i === current
                    ? "bg-blue-400"
                    : "bg-gray-200"
                }`}
            />
          ))}
        </div>

        {/* glass card */}
        <div className="bg-white/40 backdrop-blur-xl 
        border border-white/40 
        rounded-2xl 
        p-7 
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        mb-6">

          <p className="text-xs uppercase tracking-widest 
          text-gray-400 font-medium mb-5">
            {steps[current]}
          </p>

          {sections[current]}
        </div>

        {/* navigation */}
        <div className="flex justify-between items-center">

          <button
            onClick={() => setCurrent(c => c - 1)}
            className={`px-5 py-2 text-sm 
            bg-white/40 backdrop-blur-lg
            border border-white/40 
            rounded-lg 
            hover:bg-white/60 
            transition
            ${current === 0 ? "invisible" : ""}`}
          >
            Back
          </button>

          <span className="text-sm text-gray-400">
            Step {current + 1} of {steps.length}
          </span>

          {current < steps.length - 1 ? (
            <button
              onClick={() => setCurrent(c => c + 1)}
              className="px-6 py-2 text-sm 
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white 
              rounded-lg 
              shadow-lg 
              hover:scale-105 
              transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 text-sm 
              bg-gradient-to-r from-green-500 to-emerald-600
              text-white 
              rounded-lg 
              shadow-lg 
              hover:scale-105 
              transition 
              disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Resume"}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}