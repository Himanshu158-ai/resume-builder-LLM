import React from 'react';

// Ultra-minimal, pure ATS-safe executive style
// Inspired by top FAANG resumes — zero noise, all signal

const ExecutiveClean = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, editedResume, isFresher }) => {

  const handleFieldChange = (section, field, value) => {
    if (!setEditedResume) return;
    setEditedResume(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleAboutMeChange = (value) => {
    if (!setEditedResume) return;
    setEditedResume(prev => {
      const newAbout = [...(prev.aboutMe || [])];
      if (newAbout.length > 0) newAbout[0] = { ...newAbout[0], about: value };
      else newAbout.push({ about: value });
      return { ...prev, aboutMe: newAbout };
    });
  };

  const handleSkillsChange = (value) => {
    if (!setEditedResume) return;
    setEditedResume(prev => ({
      ...prev,
      skills: value.split('·').map(s => s.trim()).filter(Boolean)
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

  const editableProps = (updateFn) => ({
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    onBlur: (e) => updateFn(e.currentTarget.textContent),
    className: isEditing ? "outline-blue-400 outline outline-1 outline-offset-2 hover:bg-gray-50 cursor-text px-1 rounded-sm" : ""
  });

  const makeLink = (text, href) => (
    <a href={href} target="_blank" rel="noreferrer" style={{ color: '#1d4ed8', textDecoration: 'none' }}>
      {text}
    </a>
  );

  const SectionTitle = ({ children }) => (
    <div style={{
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: '#111827',
      borderBottom: '1.5px solid #111827',
      paddingBottom: '4px',
      marginBottom: '12px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      {children}
    </div>
  );

  return (
    <div
      style={{
        width: '794px',
        minHeight: '1123px',
        background: '#ffffff',
        margin: '0 auto',
        padding: '48px 56px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        boxSizing: 'border-box',
      }}
    >
      {/* HEADER — centered, clean */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '700',
          color: '#111827',
          margin: '0 0 8px 0',
          letterSpacing: '-0.3px',
        }}>
          <span {...editableProps(val => handleFieldChange('personalInfo', 'name', val))}>{personalInfo?.name || "Your Name"}</span>
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '6px',
          fontSize: '11.5px',
          color: '#374151',
        }}>
          {[
            personalInfo?.email && <React.Fragment key="email">{isEditing ? <span {...editableProps(val => handleFieldChange('personalInfo', 'email', val))}>{personalInfo.email}</span> : <a href={`mailto:${personalInfo.email}`} style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline hover:text-blue-600">{personalInfo.email}</a>}</React.Fragment>,
            personalInfo?.phone && <span key="phone" {...editableProps(val => handleFieldChange('personalInfo', 'phone', val))}>{personalInfo.phone}</span>,
            personalInfo?.location && <span key="location" {...editableProps(val => handleFieldChange('personalInfo', 'location', val))}>{personalInfo.location}</span>,
            personalInfo?.linkedin && <React.Fragment key="linkedin">{isEditing ? <span {...editableProps(val => handleFieldChange('personalInfo', 'linkedin', val))}>{personalInfo.linkedin}</span> : <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline hover:text-blue-600">{personalInfo.linkedin}</a>}</React.Fragment>,
            personalInfo?.github && <React.Fragment key="github">{isEditing ? <span {...editableProps(val => handleFieldChange('personalInfo', 'github', val))}>{personalInfo.github}</span> : <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline hover:text-blue-600">{personalInfo.github}</a>}</React.Fragment>,
          ].filter(Boolean).map((item, i, arr) => (
            <React.Fragment key={i}>
              {item}
              {i < arr.length - 1 && <span style={{ color: '#9ca3af' }}>|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Summary */}
        {(aboutMe?.[0]?.about) && (
          <div>
            <SectionTitle>Summary</SectionTitle>
            <p {...editableProps(val => handleAboutMeChange(val))} style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#1f2937', margin: 0 }}>
              {aboutMe[0].about}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <SectionTitle>Skills</SectionTitle>
            <p {...editableProps(val => handleSkillsChange(val))} style={{ fontSize: '12.5px', color: '#1f2937', margin: 0, lineHeight: '1.6' }}>
              {skills.join(' · ')}
            </p>
          </div>
        )}

        {/* Education */}
        {education?.college && (
          <div>
            <SectionTitle>Education</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}><span {...editableProps(val => handleFieldChange('education', 'college', val))}>{education.college}</span></div>
                <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '1px' }}><span {...editableProps(val => handleFieldChange('education', 'degree', val))}>{education.degree}</span>, <span {...editableProps(val => handleFieldChange('education', 'branch', val))}>{education.branch}</span></div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                <div><span {...editableProps(val => handleFieldChange('education', 'year', val))}>{education.year}</span></div>
                {education.cgpa && <div style={{ fontWeight: '600', color: '#111827' }}>CGPA: <span {...editableProps(val => handleFieldChange('education', 'cgpa', val))}>{education.cgpa}</span></div>}
              </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {!isFresher && experience?.length > 0 && (
          <div>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <span {...editableProps(val => handleArrayItemChange('experience', i, 'role', val))} style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>{exp.role}</span>
                    <span style={{ fontSize: '12.5px', color: '#374151' }}>, <span {...editableProps(val => handleArrayItemChange('experience', i, 'company', val))}>{exp.company}</span></span>
                  </div>
                  <span {...editableProps(val => handleArrayItemChange('experience', i, 'duration', val))} style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>{exp.duration}</span>
                </div>
                <ul style={{ margin: '5px 0 0 16px', padding: 0 }}>
                  {(exp.points?.length > 0 ? exp.points : exp.description?.split('\n'))
                    ?.filter(p => p.trim())
                    ?.map((point, j) => (
                      <li key={j} {...editableProps(val => handleArrayPointChange('experience', i, j, val))} style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6', marginBottom: '2px' }}>
                        {point.replace(/^[-•]\s*/, '')}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <span {...editableProps(val => handleArrayItemChange('projects', i, 'name', val))} style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>{p.name}</span>
                  <span {...editableProps(val => handleArrayItemChange('projects', i, 'techStack', val))} style={{ fontSize: '11.5px', color: '#6b7280', fontStyle: 'italic' }}>{p.techStack}</span>
                </div>
                <ul style={{ margin: '5px 0 0 16px', padding: 0 }}>
                  {(p.points?.length > 0 ? p.points : p.description?.split('\n'))
                    ?.filter(pt => pt.trim())
                    ?.map((point, j) => (
                      <li key={j} {...editableProps(val => handleArrayPointChange('projects', i, j, val))} style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6', marginBottom: '2px' }}>
                        {point.replace(/^[-•]\s*/, '')}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveClean;