import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Project";
import Experience from "../components/Experience";

const defaultData = {
  personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  aboutMe: "",
  education: { college: "", degree: "", branch: "", year: "", cgpa: "" },
  skills: [],
  projects: [{ name: "", techStack: "", description: "" }],
  experience: [{ company: "", role: "", duration: "", description: "" }],
  isFresher: false,
};

const steps = ["Personal info", "Education", "Skills", "Projects", "Experience"];

export default function FormPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(data);
      const res = await axios.post("http://localhost:3000/api/generate", data);
      navigate("/preview", { state: { resume: res.data } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    <PersonalInfo data={data} setData={setData} />,
    <Education data={data} setData={setData} />,
    <Skills data={data} setData={setData} />,
    <Projects data={data} setData={setData} />,
    <Experience data={data} setData={setData} />,
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-medium mb-1 dark:text-white">Build your resume</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Fill in your details — AI will generate your professional resume</p>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < current ? "bg-green-500" : i === current ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`} />
        ))}
      </div>

      {/* Section card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 font-medium mb-5">{steps[current]}</p>
        {sections[current]}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrent(c => c - 1)}
          className={`px-5 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition ${current === 0 ? "invisible" : ""}`}
        >
          Back
        </button>
        <span className="text-sm text-gray-400 dark:text-gray-500">Step {current + 1} of {steps.length}</span>
        {current < steps.length - 1 ? (
          <button onClick={() => setCurrent(c => c + 1)} className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
            {loading ? "Generating..." : "Generate resume"}
          </button>
        )}
      </div>
    </div>
  );
}