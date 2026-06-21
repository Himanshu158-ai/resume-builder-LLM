import React from 'react'
import { useRef } from 'react';

const Executiveclean
 = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, isFresher, jobTitle }) => {
    const resumeRef = useRef();

    // Helpers for editing
    const handleFieldChange = (section, field, value) => {
        if (!setEditedResume) return;
        setEditedResume(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleAboutMeChange = (value) => {
        if (!setEditedResume) return;
        setEditedResume(prev => {
            const newAbout = [...(prev.aboutMe || [])];
            if (newAbout.length > 0) {
                newAbout[0] = { ...newAbout[0], about: value };
            } else {
                newAbout.push({ about: value });
            }
            return { ...prev, aboutMe: newAbout };
        });
    };

    const handleSkillsChange = (category, value) => {
        if (!setEditedResume) return;
        setEditedResume(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: value.split(',').map(s => s.trim()).filter(Boolean)
            }
        }));
    };

    const handleArrayItemChange = (arrayName, index, field, value) => {
        if (!setEditedResume) return;
        setEditedResume(prev => {
            const newArr = [...(prev[arrayName] || [])];
            newArr[index] = { ...newArr[index], [field]: value };
            return { ...prev, [arrayName]: newArr };
        });
    };

    const handleArrayPointChange = (arrayName, itemIndex, pointIndex, value) => {
        if (!setEditedResume) return;
        setEditedResume(prev => {
            const newArr = [...(prev[arrayName] || [])];
            const newPoints = [...(newArr[itemIndex].points || [])];
            newPoints[pointIndex] = value;
            newArr[itemIndex] = { ...newArr[itemIndex], points: newPoints };
            return { ...prev, [arrayName]: newArr };
        });
    };

    const editableProps = (updateFn, customClass = "") => ({
        contentEditable: isEditing,
        suppressContentEditableWarning: true,
        onBlur: (e) => updateFn(e.currentTarget.textContent),
        className: `${customClass} ${isEditing ? "outline-blue-400 outline outline-1 outline-offset-2 hover:bg-gray-50 cursor-text rounded-sm" : ""}`
    });

    const SectionTitle = ({ children }) => (
        <div className="mb-1">
            <h2 className="text-[16px] font-bold uppercase tracking-wide text-[#4A76A8]">
                {children}
            </h2>
            <div className="border-b border-black mt-0.5" />
        </div>
    );

    return (
        <div
            id="resume"
            ref={resumeRef}
            className="bg-white text-black mx-auto"
            style={{
                width: "794px",
                padding: "25px 35px",
                minHeight: "1123px",
                fontFamily: "'Times New Roman', Times, serif",
                transformOrigin: "top center",
            }}
        >
            {/* HEADER */}
            <div className="text-center mb-3">
                <h1
                    {...editableProps(val => handleFieldChange('personalInfo', 'name', val), "text-[35px] font-bold text-[#4A76A8] leading-tight")}
                >
                    {personalInfo?.name || "Your Name"}
                </h1>
                <p
                    {...editableProps(val => {}, "italic text-[13px] mt-0.5")}
                >
                    {jobTitle || ""}
                </p>

                <div className="text-[13px] mt-1.5 flex items-center justify-center flex-wrap gap-x-1.5">
                    {personalInfo?.phone && (
                        <>
                            <span {...editableProps(val => handleFieldChange('personalInfo', 'phone', val))}>+91 {personalInfo.phone}</span>
                        </>
                    )}
                    {personalInfo?.email && (
                        <>
                            <span>|</span>
                            {isEditing
                                ? <span {...editableProps(val => handleFieldChange('personalInfo', 'email', val))}>{personalInfo.email}</span>
                                : <a href={`mailto:${personalInfo.email}`} className="text-black no-underline">{personalInfo.email}</a>
                            }
                        </>
                    )}
                    {personalInfo?.linkedin && (
                        <>
                            <span>|</span>
                            {isEditing
                                ? <span {...editableProps(val => handleFieldChange('personalInfo', 'linkedin', val))}>{personalInfo.linkedin}</span>
                                : <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-black no-underline">LinkedIn</a>
                            }
                        </>
                    )}
                    {personalInfo?.github && (
                        <>
                            <span>|</span>
                            {isEditing
                                ? <span {...editableProps(val => handleFieldChange('personalInfo', 'github', val))}>{personalInfo.github}</span>
                                : <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-black no-underline">GitHub</a>
                            }
                        </>
                    )}
                    {personalInfo?.location && (
                        <>
                            <span>|</span>
                            <span {...editableProps(val => handleFieldChange('personalInfo', 'location', val))}>{personalInfo.location}</span>
                        </>
                    )}
                </div>
            </div>

            {/* SUMMARY */}
            {aboutMe && (
                <div className="mb-3">
                    <SectionTitle>Professional Summary</SectionTitle>
                    <p
                        {...editableProps(val => handleAboutMeChange(val), "text-[13.5px] leading-snug text-justify")}
                    >
                        {aboutMe[0]?.about}
                    </p>
                </div>
            )}

            {/* SKILLS */}
            {skills && Object.keys(skills).length > 0 && (
                <div className="mb-3">
                    <SectionTitle>Skills</SectionTitle>
                    <div>
                        {Object.entries(skills)
                            .filter(([, list]) => list.length > 0)
                            .map(([category, list]) => (
                                <div
                                    key={category}
                                    className="flex text-[13.5px] leading-snug"
                                >
                                    <span className="font-bold w-[190px] shrink-0">{category} :</span>
                                    <p
                                        {...editableProps(val => handleSkillsChange(category, val), "flex-1")}
                                    >
                                        {list.join(", ")}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* PROJECTS */}
            {projects?.length > 0 && (
                <div className="mb-3">
                    <SectionTitle>Projects</SectionTitle>
                    {projects.map((p, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex justify-between">
                                <p {...editableProps(val => handleArrayItemChange('projects', i, 'name', val), "font-bold text-[13.5px]")}>
                                    {p.name}
                                </p>
                                <p {...editableProps(val => handleArrayItemChange('projects', i, 'techStack', val), "text-[13.5px] italic")}>
                                    {p.techStack}
                                </p>
                            </div>
                            <ul className="mt-0.5 text-[12.5px] flex flex-col gap-0.5 pl-5 list-disc">
                                {p.points?.map((pt, j) => (
                                    <li key={j} className="leading-snug">
                                        <span {...editableProps(val => handleArrayPointChange('projects', i, j, val))}>
                                            {pt}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* EXPERIENCE */}
            {!isFresher && experience?.length > 0 && (
                <div className="mb-3">
                    <SectionTitle>Work Experience</SectionTitle>
                    {experience.map((exp, i) => (
                        <div key={i} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold text-[13.5px]">
                                    <span {...editableProps(val => handleArrayItemChange('experience', i, 'role', val))}>{exp.role}</span>
                                </p>
                                <p {...editableProps(val => handleArrayItemChange('experience', i, 'duration', val), "text-[12px]")}>
                                    {exp.duration}
                                </p>
                            </div>
                            <p className="italic text-[13.5px]">
                                <span {...editableProps(val => handleArrayItemChange('experience', i, 'company', val))}>{exp.company}</span>
                            </p>
                            <ul className="mt-0.5 text-[12.5px] flex flex-col gap-0.5 pl-5 list-disc">
                                {exp.points?.map((p, j) => (
                                    <li key={j} className="leading-snug">
                                        <span {...editableProps(val => handleArrayPointChange('experience', i, j, val))}>
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* EDUCATION */}
            {education?.college && (
                <div className="mb-3">
                    <SectionTitle>Education</SectionTitle>
                    <div className="flex justify-between items-baseline">
                        <p {...editableProps(val => handleFieldChange('education', 'college', val), "font-bold text-[13.5px]")}>
                            {education.college}
                        </p>
                        <p {...editableProps(val => handleFieldChange('education', 'year', val), "text-[12.5px]")}>
                            {education.year}
                        </p>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <p className="italic text-[12.5px]">
                            <span {...editableProps(val => handleFieldChange('education', 'degree', val))}>{education.degree}</span>
                            {education.branch && <> - <span {...editableProps(val => handleFieldChange('education', 'branch', val))}>{education.branch}</span></>}
                        </p>
                        {education.cgpa && (
                            <p className="text-[12.5px]">
                                CGPA : <span {...editableProps(val => handleFieldChange('education', 'cgpa', val))}>{education.cgpa}</span>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Executiveclean
