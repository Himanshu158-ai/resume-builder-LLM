import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

// fonts
const fonts = {
  heading: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
  body: "Georgia, 'Times New Roman', serif",
  ui: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const sectionTitleStyle = {
  fontSize: "10.5px",
  fontWeight: "700",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#1a1a1a",
  borderBottom: "1px solid #999",
  paddingBottom: "3px",
  marginBottom: "10px",
  fontFamily: fonts.ui,
};

export default function PreviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const resumeRef = useRef();

  const resume = state?.resume;

  const [isEditing, setIsEditing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [editedResume, setEditedResume] = useState(resume);

  if (!resume) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
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
    setDownloading(true);

    await new Promise((r) => setTimeout(r, 300));

    try {
      const element = resumeRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging:false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL("image/jpeg");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "jpeg", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = - (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "jpeg", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${personalInfo?.name || "resume"}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setDownloading(false);
    }
  };

  const makeLink = (text, href) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: "#1a1a1a",
        textDecoration: "none",
        borderBottom: "1px solid #aaa",
      }}
    >
      {text}
    </a>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#f0f0f0",
        fontFamily: fonts.ui,
      }}
    >
      {/* LEFT */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px" }}>
        <div
          ref={resumeRef}
          style={{
            background: "white",
            width: "794px",
            color: "#111",
            margin: "0 auto",
            padding: "56px 64px",
            minHeight: "1123px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              borderBottom: "2px solid #1a1a1a",
              paddingBottom: "14px",
              marginBottom: "22px",
            }}
          >
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "700",
                margin: 0,
                fontFamily: fonts.heading,
              }}
            >
              {personalInfo?.name}
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginTop: "8px",
                fontSize: "12.5px",
              }}
            >
              {personalInfo?.email &&
                makeLink(personalInfo.email, `mailto:${personalInfo.email}`)}
              {personalInfo?.phone && <span>{personalInfo.phone}</span>}
              {personalInfo?.location && <span>{personalInfo.location}</span>}
              {personalInfo?.linkedin &&
                makeLink(
                  personalInfo.linkedin,
                  `https://${personalInfo.linkedin}`
                )}
              {personalInfo?.github &&
                makeLink(personalInfo.github, `https://${personalInfo.github}`)}
            </div>
          </div>

          {/* ABOUT */}
          {aboutMe && (
            <div style={{ marginBottom: "22px" }}>
              <div style={sectionTitleStyle}>Professional Summary</div>
              {isEditing ? (
                <textarea
                  value={aboutMe}
                  onChange={(e) =>
                    setEditedResume({
                      ...editedResume,
                      aboutMe: e.target.value
                    })
                  }
                  style={{
                    width: "100%",
                    fontSize: "13px",
                    padding: "8px",
                    border: "1px solid #ddd"
                  }}
                />
              ) : (
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.7",
                    fontFamily: fonts.body,
                    color: "#222",
                  }}
                >
                  {aboutMe}
                </p>
              )}
            </div>
          )}

          {/* SKILLS */}
          {skills?.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <div style={sectionTitleStyle}>Skills</div>
              <p style={{ fontSize: "13px", fontFamily: fonts.body }}>
                {skills.join(" • ")}
              </p>
            </div>
          )}

          {/* EDUCATION */}
          {education?.college && (
            <div style={{ marginBottom: "22px" }}>
              <div style={sectionTitleStyle}>Education</div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontWeight: 600, margin: 0 }}>
                    {education.college}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px" }}>
                    {education.degree} — {education.branch}
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0 }}>{education.year}</p>
                  {education.cgpa && <p>CGPA: {education.cgpa}</p>}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {!isFresher && experience?.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <div style={sectionTitleStyle}>Experience</div>

              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontWeight: 600, margin: 0 }}>
                      {exp.role} | {exp.company}
                    </p>
                    <p style={{ margin: 0, fontSize: "12px" }}>
                      {exp.duration}
                    </p>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[i].description = e.target.value;

                        setEditedResume({
                          ...editedResume,
                          experience: updated
                        });
                      }}
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        border: "1px solid #ddd",
                        padding: "8px"
                      }}
                    />
                  ) : (
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        fontFamily: fonts.body,
                        marginTop: "4px",
                        color: "#222",
                      }}
                    >
                      {exp.description}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {projects?.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <div style={sectionTitleStyle}>Projects</div>

              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontWeight: 600, margin: 0 }}>{p.name}</p>
                    <p style={{ margin: 0, fontSize: "12px" }}>
                      {p.techStack}
                    </p>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={p.description}
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i].description = e.target.value;

                        setEditedResume({
                          ...editedResume,
                          projects: updated
                        });
                      }}
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        border: "1px solid #ddd",
                        padding: "8px"
                      }}
                    />
                  ) : (
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        fontFamily: fonts.body,
                        marginTop: "4px",
                      }}
                    >
                      {p.description}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        style={{
          width: "280px",
          background: "#f8f9fb",
          borderLeft: "1px solid #e5e7eb",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontFamily: fonts.ui
        }}
      >
        {/* Score Card */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid #eee"
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#777",
              marginBottom: "6px",
              letterSpacing: "1px"
            }}
          >
            ATS SCORE
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#111"
              }}
            >
              {finalReview}
            </span>
            <span style={{ fontSize: "14px", color: "#999" }}>/10</span>
          </div>

          {/* progress */}
          <div
            style={{
              height: "6px",
              background: "#eee",
              borderRadius: "999px",
              marginTop: "10px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${scorePercent}%`,
                height: "6px",
                background: "linear-gradient(90deg,#1D9E75,#22c55e)",
                borderRadius: "999px",
                transition: "0.4s"
              }}
            />
          </div>
        </div>

        {/* buttons */}

        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            padding: "10px",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {isEditing ? "Save Changes" : "Edit Resume"}
        </button>


        <button
          onClick={downloadPDF}
          style={{
            padding: "10px",
            background: "#185FA5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          {downloading ? "Generating..." : "Download PDF"}
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px",
            background: "white",
            color: "#444",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Back to Form
        </button>

        {/* suggestions */}
        {suggestions?.length > 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid #eee"
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#222"
              }}
            >
              AI Suggestions
            </p>

            {suggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  color: "#222"
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#185FA5",
                    borderRadius: "50%",
                    marginTop: "6px",

                  }}
                />
                <p
                  style={{
                    fontSize: "12px",
                    color: "#555",
                    margin: 0,
                    lineHeight: "1.4"
                  }}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}