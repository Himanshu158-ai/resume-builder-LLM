import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import Classical from "../templates/Classical";
import ModernMinimalist from "../templates/ModernMinimalist";
import ExecutiveClean from "../templates/Executiveclean";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ClassicalPDF from '../pdf-download/classicalResumePdf';



const TEMPLATES = [
  { id: "classical", label: "Classical", emoji: "📜" },
  // { id: "modern", label: "Modern", emoji: "🎨" },
  // { id: "executive", label: "Executive Clean", emoji: "🖤" },
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

  if (!resume) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-sm">
        Data not found
      </div>
    );
  }

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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-sans overflow-hidden">

      {/* ── MOBILE TOP BAR ── */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <span className="font-semibold text-gray-800 text-sm">Resume Preview</span>
        <div className="flex gap-2">
          <PDFDownloadLink
            document={
              <ClassicalPDF
                aboutMe={aboutMe}
                skills={skills}
                education={education}
                experience={experience}
                projects={projects}
                personalInfo={personalInfo}
                isFresher={isFresher}
                jobTitle={jobTitle}
              />
            }
            fileName={`${personalInfo?.name?.replace(/\s+/g, "_") || "resume"}.pdf`}
            className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors shadow-sm font-medium flex items-center"
          >
            {({ loading }) => loading ? 'Generating...' : 'Download PDF'}
          </PDFDownloadLink>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md"
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* ── LEFT: RESUME PREVIEW ── */}
      <div className="flex-1 overflow-y-auto px-3 py-5 lg:px-6 lg:py-8">
        <div ref={resumeRef}>
          <TemplateRenderer id={selectedTemplate} props={templateProps} />
        </div>
      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-20 bg-[#f8f9fb] border-t border-gray-200
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-y-0" : "translate-y-full"}
          lg:static lg:translate-y-0 lg:w-72 lg:border-t-0 lg:border-l lg:border-gray-200
          lg:flex lg:flex-col lg:overflow-y-auto
          max-h-[80vh] lg:max-h-full overflow-y-auto
        `}
      >
        <div className="flex flex-col gap-4 p-5">

          {/* ATS Score Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-1">ATS Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">{finalReview}</span>
              <span className="text-sm text-gray-400">/10</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${scorePercent}%`,
                  background: "linear-gradient(90deg, #1D9E75, #22c55e)",
                }}
              />
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {isEditing ? "✓ Save Changes" : "✎ Edit Resume"}
          </button>

          {/* Download Button */}
          <PDFDownloadLink
            document={
              <ClassicalPDF
                aboutMe={aboutMe}
                skills={skills}
                education={education}
                experience={experience}
                projects={projects}
                personalInfo={personalInfo}
                isFresher={isFresher}
                jobTitle={jobTitle}
              />
            }
            fileName={`${personalInfo?.name?.replace(/\s+/g, "_") || "resume"}.pdf`}
            className="flex items-center justify-center w-full py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-700 transition-all shadow-sm"
          >
            {({ loading }) => loading ? 'Generating...' : 'Download PDF'}
          </PDFDownloadLink>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 bg-white text-gray-500 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            ← Back to Form
          </button>

          {/* ── TEMPLATE SELECTOR ── */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-3">
              Choose Template
            </p>
            <div className="flex flex-col gap-2">
              {TEMPLATES.map((t) => {
                const isActive = selectedTemplate === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`
                      flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-150 cursor-pointer border
                      ${isActive
                        ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                      }
                    `}
                  >
                    <span className="text-base leading-none">{t.emoji}</span>
                    <span>{t.label}</span>
                    {isActive && (
                      <span className="ml-auto text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-semibold">
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
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}