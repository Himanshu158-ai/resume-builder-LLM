import React from 'react'
import { useRef } from 'react';

const Classical = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, isFresher }) => {
    const resumeRef = useRef();
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
                                setEditedResume(prev => ({
                                    ...prev,
                                    aboutMe: [
                                        {
                                            ...(prev.aboutMe?.[0] || {}),
                                            about: e.target.value
                                        }
                                    ]
                                }))
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
                                        updated[i] = { ...updated[i], points: e.target.value.split("\n").filter(p => p.trim() !== "") };
                                        setEditedResume(prev => ({ ...prev, experience: updated }));
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
                                        updated[i] = { ...updated[i], points: e.target.value.split("\n").filter(pt => pt.trim() !== "") };
                                        setEditedResume(prev => ({ ...prev, projects: updated }));
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
    )
}

export default Classical