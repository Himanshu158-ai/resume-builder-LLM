import React from 'react'
import { useRef } from 'react';

const Classical = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, isFresher, jobTitle }) => {
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

    const handleSkillsChange = (value) => {
        if (!setEditedResume) return;
        setEditedResume(prev => ({
            ...prev,
            skills: value.split('•').map(s => s.trim()).filter(Boolean)
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
        <div className="text-[15px] font-bold tracking-widest uppercase text-gray-900 border-b-1 border-gray-600 pb-1 mb-3 font-sans">
            {children}
        </div>
    );

    return (
        <div
            id="resume"
            ref={resumeRef}
            className="bg-white text-gray-900 mx-auto"
            style={{
                width: "794px",
                padding: "40px 50px",
                minHeight: "1123px",
                fontFamily: "'Inter', 'Arial', sans-serif",
            }}
        >
            {/* HEADER */}
            <div className="flex justify-between items-start  pb-4 mb-5">
                {/* LEFT */}
                <div>
                    <h1
                        {...editableProps(val => handleFieldChange('personalInfo', 'name', val), "text-[37px] font-semibold m-0 tracking-tight")}
                    >
                        {personalInfo?.name || "Your Name"}
                    </h1>
                    <p className="text-[13px] text-gray-600 mt-1">
                        {jobTitle || "MERN Stack Developer | AI Integration"}
                    </p>
                </div>

                
                {/* RIGHT */}
                <div className="text-right text-[12px] text-gray-900 space-y-1.5 w-1/3 flex ">
                    {/* Only the text span is editable to prevent deleting the icon */}
                    <div className="w-px bg-gray-600 self-stretch mx-3" />
                    <div className='text-right text-[12px] text-gray-900 space-y-1 w-full flex flex-col '>
                        {personalInfo?.email && <div className="flex items-center justify-start gap-1.5 w-full">
                            {isEditing ? <span {...editableProps(val => handleFieldChange('personalInfo', 'email', val))}>{personalInfo.email}</span> : <a href={`mailto:${personalInfo.email}`} className="text-gray-700 hover:underline hover:text-blue-400">{personalInfo.email}</a>}
                        </div>}
                        {personalInfo?.phone && <div className="flex items-center justify-start gap-1.5 w-full"> <span {...editableProps(val => handleFieldChange('personalInfo', 'phone', val))}>{personalInfo.phone}</span></div>}
                        {personalInfo?.location && <div className="flex items-center justify-start gap-1.5 w-full"> <span {...editableProps(val => handleFieldChange('personalInfo', 'location', val))}>{personalInfo.location}</span></div>}
                        {personalInfo?.linkedin && <div className="flex items-center justify-start gap-1.5 w-full">
                            {isEditing ? <span {...editableProps(val => handleFieldChange('personalInfo', 'linkedin', val))}>{personalInfo.linkedin}</span> : <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-gray-700 hover:underline hover:text-blue-400">{personalInfo.linkedin}</a>}
                        </div>}
                        {personalInfo?.github && (
                            <div className="flex items-center justify-start gap-1.5 w-full">
                                {isEditing
                                    ? <span {...editableProps(val => handleFieldChange('personalInfo', 'github', val))}>
                                        {personalInfo.github}
                                    </span>
                                    : <a
                                        href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-700 hover:underline hover:text-blue-400"
                                    >
                                        {personalInfo.github}
                                    </a>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SUMMARY */}
            {aboutMe && (
                <div className="mb-4">
                    <SectionTitle>Summary</SectionTitle>
                    <p
                        {...editableProps(val => handleAboutMeChange(val), "text-[13px] text-gray-800 leading-relaxed")}
                    >
                        {aboutMe[0]?.about}
                    </p>
                </div>
            )}

            {/* SKILLS */}
            {skills?.length > 0 && (
                <div className="mb-4">
                    <SectionTitle>Skills</SectionTitle>
                    <p
                        {...editableProps(val => handleSkillsChange(val), "text-[13px]")}
                    >
                        {skills.join(" • ")}
                    </p>
                </div>
            )}

            {/* EXPERIENCE */}
            {!isFresher && experience?.length > 0 && (
                <div className="mb-4">
                    <SectionTitle>Experience</SectionTitle>
                    {experience.map((exp, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between">
                                <p className="font-semibold text-[13px] text-gray-800">
                                    <span {...editableProps(val => handleArrayItemChange('experience', i, 'role', val))}>{exp.role}</span> — <span {...editableProps(val => handleArrayItemChange('experience', i, 'company', val))}>{exp.company}</span>
                                </p>
                                <p {...editableProps(val => handleArrayItemChange('experience', i, 'duration', val), "text-[12px] text-gray-600")}>
                                    {exp.duration}
                                </p>
                            </div>
                            <ul className="mt-1 text-[13px] flex flex-col gap-1 pl-2">
                                {exp.points?.map((p, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                        <span className="text-gray-800">•</span>
                                        <span {...editableProps(val => handleArrayPointChange('experience', i, j, val))} className="flex-1 leading-relaxed">
                                            {p}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* PROJECTS */}
            {projects?.length > 0 && (
                <div className="mb-4">
                    <SectionTitle>Projects</SectionTitle>
                    {projects.map((p, i) => (
                        <div key={i} className="mb-5">
                            <div className="flex justify-between">
                                <p {...editableProps(val => handleArrayItemChange('projects', i, 'name', val), "font-semibold text-[13px] text-gray-800")}>
                                    {p.name}
                                </p>
                                <p {...editableProps(val => handleArrayItemChange('projects', i, 'techStack', val), "text-[12px] text-gray-600")}>
                                    {p.techStack}
                                </p>
                            </div>
                            <ul className="mt-1 text-[13px] flex flex-col pl-1">
                                {p.points?.map((pt, j) => (
                                    <li key={j} className="flex items-start gap-1.5">
                                        <span className="text-gray-900">•</span>
                                        <span {...editableProps(val => handleArrayPointChange('projects', i, j, val))} className="flex-1 leading-relaxed">
                                            {pt}
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
                <div className="mb-4">
                    <SectionTitle>Education</SectionTitle>
                    <div className="flex justify-between">
                        <div>
                            <p {...editableProps(val => handleFieldChange('education', 'college', val), "font-semibold text-[13px]")}>
                                {education.college}
                            </p>
                            <p className="text-[12px] text-gray-600">
                                <span {...editableProps(val => handleFieldChange('education', 'degree', val))}>{education.degree}</span> — <span {...editableProps(val => handleFieldChange('education', 'branch', val))}>{education.branch}</span>
                            </p>
                        </div>
                        <div className="text-right text-[12px] text-gray-600">
                            <p {...editableProps(val => handleFieldChange('education', 'year', val))}>{education.year}</p>
                            {education.cgpa && (
                                <p>CGPA: <span {...editableProps(val => handleFieldChange('education', 'cgpa', val))}>{education.cgpa}</span></p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Classical