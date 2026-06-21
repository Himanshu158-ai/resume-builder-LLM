import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import Classical from "../templates/Classical";
import ModernMinimalist from "../templates/ModernMinimalist";
import ExecutiveClean from "../templates/Executiveclean";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ClassicalPDF from '../pdf-download/classicalResumePdf';
import ExecutiveCleanPDF from '../pdf-download/executiveResumePdf';


const PDF_TEMPLATE_MAP = {
  classical: ClassicalPDF,
  executive: ExecutiveCleanPDF,
  // add more: "<template-id>": <PDFComponent>,
};

const TEMPLATES = [
  { id: "classical", label: "Classical", emoji: "📜" },
  // { id: "modern", label: "Modern", emoji: "🎨" },
  { id: "executive", label: "Executive Clean", emoji: "🖤" },
];

function TemplateRenderer({ id, props }) {
  switch (id) {
    case "classical": return <Classical        {...props} />;
    case "modern": return <ModernMinimalist {...props} />;
    case "executive": return <ExecutiveClean   {...props} />;
    default: return <Classical        {...props} />;
  }
}



export default function PreviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const resumeRef = useRef();

  const resume = state?.resume;

  const [isEditing, setIsEditing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [editedResume, setEditedResume] = useState(resume);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classical");

  const SelectedPDF = PDF_TEMPLATE_MAP[selectedTemplate] || ClassicalPDF; // fallback if id not found


  if (!resume) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-sm">
        Data not found
      </div>
    );
  }


  useEffect(() => {
    const scale = () => {
      const wrapper = document.getElementById("resume-scale-wrapper");
      if (!wrapper) return;
      const parent = wrapper.parentElement;
      const availableWidth = parent.clientWidth - 32;
      const s = Math.min(1, availableWidth / 794);
      const originalHeight = wrapper.scrollHeight;

      wrapper.style.transform = `scale(${s})`;
      wrapper.style.transformOrigin = "top center";
      wrapper.style.width = "794px";
      wrapper.style.marginBottom = `-${originalHeight - originalHeight * s}px`;
    };

    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, []);

  const {
    personalInfo,
    education,
    skills,
    projects,
    experience,
    finalReview,
    aboutMe,
    isFresher,
    jobTitle,
  } = editedResume;

  const scorePercent = (parseFloat(finalReview || "0") / 10) * 100;

  const templateProps = {
    aboutMe,
    skills,
    education,
    experience,
    projects,
    personalInfo,
    isEditing,
    setEditedResume,
    editedResume,
    isFresher,
    jobTitle,
  };



  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#0A0A0A] font-sans overflow-hidden">

      {/* ── MOBILE TOP BAR ── */}
      <div className="lg:hidden flex items-center justify-between bg-[#111111] border-b border-white/[0.08] px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="font-semibold text-white text-sm tracking-tight">Resume Preview</span>
        </div>
        <div className="flex gap-2">
          <PDFDownloadLink
            document={
              <SelectedPDF
                aboutMe={aboutMe} skills={skills} education={education}
                experience={experience} projects={projects}
                personalInfo={personalInfo} isFresher={isFresher} jobTitle={jobTitle}
              />
            }
            fileName={`${personalInfo?.name?.replace(/\s+/g, "_") || "resume"}.pdf`}
            className="text-[12px] bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5"
          >
            {({ loading }) => loading ? 'Generating...' : '↓ Download'}
          </PDFDownloadLink>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[12px] bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-[#A1A1AA] px-3 py-1.5 rounded-lg transition-all"
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* ── LEFT: RESUME PREVIEW ── */}
      <div className="flex-1 bg-[#0A0A0A] flex flex-col min-h-0">

        <div className="hidden md:flex items-center gap-2 px-10 pt-8 pb-4 shrink-0 justify-center align-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-[#71717A] uppercase tracking-widest font-medium">
            Live Preview
          </span>
        </div>

        {/* Outer: clips horizontal overflow strictly */}
        <div
          className="flex-1 overflow-y-auto pb-8 pt-2"
          style={{ overflowX: "clip" }}
        >
          {/* Center wrapper */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div id="resume-scale-wrapper" style={{ width: "794px", flexShrink: 0 }}>
              <div ref={resumeRef}>
                <TemplateRenderer id={selectedTemplate} props={templateProps} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <div
        className={`
        fixed bottom-0 left-0 right-0 z-20
        bg-[#111111] border-t border-white/[0.08]
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-y-0" : "translate-y-full"}
        lg:static lg:translate-y-0 lg:w-72
        lg:border-t-0 lg:border-l lg:border-white/[0.06]
        lg:flex lg:flex-col lg:overflow-y-auto
        max-h-[85vh] lg:max-h-full overflow-y-auto
      `}
      >
        <div className="flex flex-col gap-3 p-5">

          {/* Header */}
          <div className="pb-4 border-b border-white/[0.06] mb-1">
            <p className="text-[11px] text-[#71717A] uppercase tracking-widest font-medium">Controls</p>
          </div>

          {/* ATS Score Card */}
          <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4">
            <p className="text-[10px] text-[#71717A] tracking-widest uppercase mb-3 font-medium">ATS Score</p>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-4xl font-bold text-white tracking-tight">{finalReview}</span>
              <span className="text-sm text-[#71717A]">/10</span>
              <span className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-md
              ${finalReview >= 8
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : finalReview >= 6
                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {finalReview >= 8 ? "Strong" : finalReview >= 6 ? "Good" : "Weak"}
              </span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-1 rounded-full transition-all duration-700"
                style={{
                  width: `${scorePercent}%`,
                  background: finalReview >= 8 ? "#22c55e" : finalReview >= 6 ? "#f59e0b" : "#ef4444",
                }}
              />
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer
            ${isEditing
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-[#A1A1AA] hover:text-white"
              }`}
          >
            {isEditing ? "✓ Save Changes" : "✎ Edit Resume"}
          </button>

          {/* Download Button */}
          <PDFDownloadLink
            document={
              <SelectedPDF
                aboutMe={aboutMe} skills={skills} education={education}
                experience={experience} projects={projects}
                personalInfo={personalInfo} isFresher={isFresher} jobTitle={jobTitle}
              />
            }
            fileName={`${personalInfo?.name?.replace(/\s+/g, "_") || "resume"}.pdf`}
            className="flex items-center justify-center gap-2 w-full py-2.5
            bg-indigo-600 hover:bg-indigo-500
            text-white rounded-xl text-[13px] font-semibold
            transition-all duration-200"
          >
            {({ loading }) => loading
              ? <><svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Generating...</>
              : <>↓ Download PDF</>
            }
          </PDFDownloadLink>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 bg-transparent hover:bg-white/[0.04]
            text-[#71717A] hover:text-[#A1A1AA]
            border border-white/[0.08]
            rounded-xl text-[13px] transition-all duration-200 cursor-pointer"
          >
            ← Back to Form
          </button>

          {/* ── TEMPLATE SELECTOR ── */}
          <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 mt-1">
            <p className="text-[10px] text-[#71717A] tracking-widest uppercase mb-3 font-medium">
              Template
            </p>
            <div className="flex flex-col gap-1.5">
              {TEMPLATES.map((t) => {
                const isActive = selectedTemplate === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[12px] font-medium
                    transition-all duration-150 cursor-pointer border
                    ${isActive
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-transparent text-[#A1A1AA] border-white/[0.08] hover:bg-white/[0.05] hover:text-white"
                      }`}
                  >
                    <span className="text-sm leading-none">{t.emoji}</span>
                    <span>{t.label}</span>
                    {isActive && (
                      <span className="ml-auto text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-semibold">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-10 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
}