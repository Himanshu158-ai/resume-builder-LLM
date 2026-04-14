import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function PreviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const resumeRef = useRef();

  const resume = state?.resume;

  const [isEditing, setIsEditing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [editedResume, setEditedResume] = useState(resume);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    suggestions,
    aboutMe,
    isFresher,
  } = editedResume;

  const scorePercent = (parseFloat(finalReview || "0") / 10) * 100;

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    setDownloading(true);

    const element = resumeRef.current;

    // Save original styles
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;
    const originalPadding = element.style.padding;
    const originalBoxShadow = element.style.boxShadow;

    try {
      // ✅ Force desktop layout (important for mobile consistency)
      element.style.width = "794px";
      element.style.maxWidth = "none";
      element.style.padding = "56px 64px";
      element.style.boxShadow = "none";

      const canvas = await html2canvas(element, {
        scale: 3, // 🔥 better quality
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: 794,
      });

      // ✅ compress image (size reduce)
      const imgData = canvas.toDataURL("image/jpeg", 0.75);

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // ✅ clean multi-page logic
      while (heightLeft > 0) {
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        if (heightLeft > 0) {
          pdf.addPage();
          position = -pdfHeight;
        }
      }

      pdf.save(`${personalInfo?.name?.replace(/\s+/g, "_") || "resume"}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      // restore styles
      element.style.width = originalWidth;
      element.style.maxWidth = originalMaxWidth;
      element.style.padding = originalPadding;
      element.style.boxShadow = originalBoxShadow;

      setDownloading(false);
    }
  };


  const makeLink = (text, href) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-gray-800 no-underline border-b border-gray-400 hover:border-gray-700 transition-colors"
    >
      {text}
    </a>
  );

  const SectionTitle = ({ children }) => (
    <div className="text-[10.5px] font-bold tracking-widest uppercase text-gray-900 border-b border-gray-400 pb-1 mb-3 font-sans">
      {children}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-sans overflow-hidden">

      {/* ── MOBILE TOP BAR ── */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <span className="font-semibold text-gray-800 text-sm">Resume Preview</span>
        <div className="flex gap-2">
          <button
            onClick={downloadPDF}
            className="text-xs bg-blue-700 text-white px-3 py-1.5 rounded-md font-semibold"
          >
            {downloading ? "..." : "Download"}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md"
          >
            {sidebarOpen ? "Close" : "Score & Tips"}
          </button>
        </div>
      </div>

      {/* ── LEFT: RESUME PREVIEW ── */}
      <div className="flex-1 overflow-y-auto px-3 py-5 lg:px-6 lg:py-8">
        <div
          ref={resumeRef}
          className="bg-white text-gray-900 mx-auto shadow-md"
          style={{
            width: "794px",
            maxWidth: "100%",
            padding: "clamp(24px, 5vw, 56px) clamp(20px, 6vw, 64px)",
            minHeight: "1123px",
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          {/* HEADER */}
          <div className="border-b-2 border-gray-900 pb-3 mb-5">
            <h1
              className="text-2xl lg:text-[28px] font-bold m-0"
              style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif" }}
            >
              {personalInfo?.name}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[12.5px] text-gray-700">
              {personalInfo?.email && makeLink(personalInfo.email, `mailto:${personalInfo.email}`)}
              {personalInfo?.phone && <span>{personalInfo.phone}</span>}
              {personalInfo?.location && <span>{personalInfo.location}</span>}
              {personalInfo?.linkedin && makeLink(personalInfo.linkedin, `https://${personalInfo.linkedin}`)}
              {personalInfo?.github && makeLink(personalInfo.github, `https://${personalInfo.github}`)}
            </div>
          </div>

          {/* ABOUT ME */}
          {aboutMe && (
            <div className="mb-5">
              <SectionTitle>Professional Summary</SectionTitle>
              {isEditing ? (
                <textarea
                  value={aboutMe[0]?.about || ""}
                  onChange={(e) =>
                    setEditedResume({
                      ...editedResume,
                      aboutMe: [
                        {
                          ...aboutMe[0],
                          about: e.target.value
                        }
                      ]
                    })
                  }
                  className="w-full text-[13px] p-2 border border-gray-300 rounded resize-y min-h-[80px] font-serif"
                />
              ) : (
                <p className="text-[13px] leading-relaxed text-gray-800 m-0">
                  {aboutMe[0]?.about}
                </p>
              )}
            </div>
          )}

          {/* SKILLS */}
          {skills?.length > 0 && (
            <div className="mb-5">
              <SectionTitle>Skills</SectionTitle>
              <p className="text-[13px] text-gray-800 m-0">{skills.join(" • ")}</p>
            </div>
          )}

          {/* EDUCATION */}
          {education?.college && (
            <div className="mb-5">
              <SectionTitle>Education</SectionTitle>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-semibold m-0 text-[13px]">{education.college}</p>
                  <p className="m-0 text-[12px] text-gray-600">
                    {education.degree} — {education.branch}
                  </p>
                </div>
                <div className="text-right text-[12px] text-gray-600">
                  <p className="m-0">{education.year}</p>
                  {education.cgpa && <p className="m-0">CGPA: {education.cgpa}</p>}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {!isFresher && experience?.length > 0 && (
            <div className="mb-5">
              <SectionTitle>Experience</SectionTitle>
              {experience.map((exp, i) => (
                <div key={i} className="mb-4 break-inside-avoid">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <p className="font-semibold m-0 text-[13px]">
                      {exp.role} | {exp.company}
                    </p>
                    <p className="m-0 text-[12px] text-gray-500">{exp.duration}</p>
                  </div>

                  {isEditing ? (
                    // ✅ Editing mode — textarea me points join karke dikhao
                    <textarea
                      value={exp.points?.join("\n") || exp.description || ""}
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[i].points = e.target.value.split("\n").filter(p => p.trim() !== "");
                        setEditedResume({ ...editedResume, experience: updated });
                      }}
                      className="w-full min-h-[80px] border border-gray-300 rounded p-2 text-[13px] font-serif resize-y mt-1"
                    />
                  ) : (
                    // ✅ View mode — bullet points render karo
                    <ul className="mt-1 ml-4 list-disc text-[13px] leading-relaxed font-serif text-gray-800">
                      {(exp.points?.length > 0 ? exp.points : exp.description?.split("\n"))
                        ?.filter(p => p.trim() !== "")
                        ?.map((point, j) => (
                          <li key={j} className="mb-1 break-inside-avoid">
                            {point.replace(/^[-•]\s*/, "")}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projects?.length > 0 && (
            <div className="mb-5">
              <SectionTitle>Projects</SectionTitle>
              {projects.map((p, i) => (
                <div key={i} className="mb-4 break-inside-avoid">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <p className="font-semibold m-0 text-[13px] font-palatino">{p.name}</p>
                    <p className="m-0 text-[12px] text-gray-500">{p.techStack}</p>
                  </div>

                  {isEditing ? (
                    // ✅ Editing mode
                    <textarea
                      value={p.points?.join("\n") || p.description || ""}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].points = e.target.value.split("\n").filter(pt => pt.trim() !== "");
                        setEditedResume({ ...editedResume, projects: updated });
                      }}
                      className="w-full min-h-[80px] border border-gray-300 rounded p-2 text-[13px] font-serif resize-y mt-1"
                    />
                  ) : (
                    // ✅ View mode — bullet points
                    <ul className="mt-1 ml-4 list-disc text-[13px] leading-relaxed font-serif text-gray-700">
                      {(p.points?.length > 0 ? p.points : p.description?.split("\n"))
                        ?.filter(pt => pt.trim() !== "")
                        ?.map((point, j) => (
                          <li key={j} className="mb-1 break-inside-avoid">
                            {point.replace(/^[-•]\s*/, "")}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT SIDEBAR ── */}
      {/* Mobile: slides in as overlay from bottom; Desktop: fixed right panel */}
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
          <button
            onClick={downloadPDF}
            className="w-full py-2.5 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
          >
            {downloading ? "Generating PDF..." : "⬇ Download PDF"}
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 bg-white text-gray-500 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            ← Back to Form
          </button>

          {/* AI Suggestions */}
          {suggestions?.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-[13px] font-semibold text-gray-800 mb-3">AI Suggestions</p>
              <div className="flex flex-col gap-2.5">
                {suggestions.map((s, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <p className="text-[12px] text-gray-500 m-0 leading-snug">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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