import React from 'react';

const ModernMinimalist = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, isFresher }) => {

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
      skills: value.split(',').map(s => s.trim()).filter(Boolean)
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

  const editablePropsDark = (updateFn) => ({
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    onBlur: (e) => updateFn(e.currentTarget.textContent),
    className: isEditing ? "outline-blue-400 outline outline-1 outline-offset-2 hover:bg-white/10 cursor-text rounded-sm" : ""
  });

  const editablePropsLight = (updateFn) => ({
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    onBlur: (e) => updateFn(e.currentTarget.textContent),
    className: isEditing ? "outline-blue-400 outline outline-1 outline-offset-2 hover:bg-black/5 cursor-text rounded-sm" : ""
  });

  const makeLink = (text, href) => (
    <a href={href} target="_blank" rel="noreferrer" className="hover:underline">
      {text}
    </a>
  );

  const SectionTitle = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <span style={{
        fontSize: '9px',
        fontWeight: '700',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: '#1a1a2e',
        fontFamily: "'DM Sans', sans-serif",
      }}>{children}</span>
      <div style={{ flex: 1, height: '1px', background: '#1a1a2e' }} />
    </div>
  );

  return (
    <div
      style={{
        width: '794px',
        minHeight: '1123px',
        background: '#ffffff',
        display: 'flex',
        fontFamily: "'DM Sans', Arial, sans-serif",
        margin: '0 auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      {/* LEFT SIDEBAR */}
      <div style={{
        width: '220px',
        minHeight: '1123px',
        background: '#1a1a2e',
        padding: '36px 20px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}>
        {/* Name */}
        <div>
          <div style={{
            width: '54px', height: '4px',
            background: '#e8c547', marginBottom: '14px', borderRadius: '2px'
          }} />
          <h1 style={{
            color: '#ffffff',
            fontSize: '22px',
            fontWeight: '700',
            lineHeight: 1.2,
            margin: 0,
            fontFamily: "'DM Serif Display', Georgia, serif",
          }}>
            <span {...editablePropsDark(val => handleFieldChange('personalInfo', 'name', val))}>{personalInfo?.name || "Your Name"}</span>
          </h1>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#e8c547', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {personalInfo?.email && <div style={{ fontSize: '11px', color: '#c8c8d8', wordBreak: 'break-all' }}>
              {isEditing ? <span {...editablePropsDark(val => handleFieldChange('personalInfo', 'email', val))}>{personalInfo.email}</span> : <a href={`mailto:${personalInfo.email}`} style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">{personalInfo.email}</a>}
            </div>}
            {personalInfo?.phone && <div style={{ fontSize: '11px', color: '#c8c8d8' }}><span {...editablePropsDark(val => handleFieldChange('personalInfo', 'phone', val))}>{personalInfo.phone}</span></div>}
            {personalInfo?.location && <div style={{ fontSize: '11px', color: '#c8c8d8' }}><span {...editablePropsDark(val => handleFieldChange('personalInfo', 'location', val))}>{personalInfo.location}</span></div>}
            {personalInfo?.linkedin && <div style={{ fontSize: '11px', color: '#e8c547' }}>
              {isEditing ? <span {...editablePropsDark(val => handleFieldChange('personalInfo', 'linkedin', val))}>{personalInfo.linkedin}</span> : <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">{personalInfo.linkedin}</a>}
            </div>}
            {personalInfo?.github && <div style={{ fontSize: '11px', color: '#e8c547' }}>
              {isEditing ? <span {...editablePropsDark(val => handleFieldChange('personalInfo', 'github', val))}>{personalInfo.github}</span> : <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">{personalInfo.github}</a>}
            </div>}
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#e8c547', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>Skills</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ width: '4px', height: '4px', background: '#e8c547', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }} />
                <span {...editablePropsDark(val => handleSkillsChange(val))} style={{ fontSize: '11px', color: '#c8c8d8', display: 'inline-block' }}>
                  {skills.join(', ')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Education in sidebar */}
        {education?.college && (
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#e8c547', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>Education</div>
            <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: '600', marginBottom: '3px' }}>
              <span {...editablePropsDark(val => handleFieldChange('education', 'college', val))}>{education.college}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#c8c8d8', marginBottom: '2px' }}>
              <span {...editablePropsDark(val => handleFieldChange('education', 'degree', val))}>{education.degree}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#c8c8d8', marginBottom: '2px' }}>
              <span {...editablePropsDark(val => handleFieldChange('education', 'branch', val))}>{education.branch}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#8888a8' }}>
              <span {...editablePropsDark(val => handleFieldChange('education', 'year', val))}>{education.year}</span>
            </div>
            {education.cgpa && (
              <div style={{ fontSize: '10px', color: '#e8c547', marginTop: '3px' }}>
                CGPA: <span {...editablePropsDark(val => handleFieldChange('education', 'cgpa', val))}>{education.cgpa}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT MAIN */}
      <div style={{ flex: 1, padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Summary */}
        {(aboutMe?.[0]?.about) && (
          <div>
            <SectionTitle>Professional Summary</SectionTitle>
            <p {...editablePropsLight(val => handleAboutMeChange(val))} style={{ fontSize: '12.5px', lineHeight: 1.65, color: '#333344', margin: 0 }}>
              {aboutMe[0].about}
            </p>
          </div>
        )}

        {/* Experience */}
        {!isFresher && experience?.length > 0 && (
          <div>
            <SectionTitle>Experience</SectionTitle>
             {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <span {...editablePropsLight(val => handleArrayItemChange('experience', i, 'role', val))} style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{exp.role}</span>
                    <span style={{ fontSize: '12px', color: '#555566' }}> · <span {...editablePropsLight(val => handleArrayItemChange('experience', i, 'company', val))}>{exp.company}</span></span>
                  </div>
                  <span {...editablePropsLight(val => handleArrayItemChange('experience', i, 'duration', val))} style={{
                    fontSize: '10px', color: '#ffffff', background: '#1a1a2e',
                    padding: '2px 8px', borderRadius: '10px', fontWeight: '600'
                  }}>{exp.duration}</span>
                </div>
                <ul style={{ margin: '6px 0 0 16px', padding: 0, listStyle: 'disc' }}>
                  {(exp.points?.length > 0 ? exp.points : exp.description?.split('\n'))
                    ?.filter(p => p.trim())
                    ?.map((point, j) => (
                      <li key={j} {...editablePropsLight(val => handleArrayPointChange('experience', i, j, val))} style={{ fontSize: '12px', color: '#444455', lineHeight: 1.6, marginBottom: '3px' }}>
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
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                  <span {...editablePropsLight(val => handleArrayItemChange('projects', i, 'name', val))} style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{p.name}</span>
                  <span {...editablePropsLight(val => handleArrayItemChange('projects', i, 'techStack', val))} style={{ fontSize: '10px', color: '#e8c547', fontWeight: '600', background: '#1a1a2e', padding: '2px 8px', borderRadius: '10px' }}>
                    {p.techStack}
                  </span>
                </div>
                <ul style={{ margin: '6px 0 0 16px', padding: 0, listStyle: 'disc' }}>
                  {(p.points?.length > 0 ? p.points : p.description?.split('\n'))
                    ?.filter(pt => pt.trim())
                    ?.map((point, j) => (
                      <li key={j} {...editablePropsLight(val => handleArrayPointChange('projects', i, j, val))} style={{ fontSize: '12px', color: '#444455', lineHeight: 1.6, marginBottom: '3px' }}>
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

export default ModernMinimalist;