import React from 'react';

// Ultra-minimal, pure ATS-safe executive style
// Inspired by top FAANG resumes — zero noise, all signal

const ExecutiveClean = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, editedResume, isFresher }) => {

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

  const inputStyle = {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '6px 8px',
    fontSize: '12px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    color: '#111827',
    background: '#f9fafb',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '72px',
    lineHeight: '1.6',
  };

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
        {isEditing ? (
          <input
            style={{ ...inputStyle, fontSize: '22px', fontWeight: '700', textAlign: 'center', marginBottom: '10px' }}
            value={personalInfo?.name || ''}
            onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, name: e.target.value } }))}
            placeholder="Your Name"
          />
        ) : (
          <h1 style={{
            fontSize: '26px',
            fontWeight: '700',
            color: '#111827',
            margin: '0 0 8px 0',
            letterSpacing: '-0.3px',
          }}>
            {personalInfo?.name}
          </h1>
        )}

        {isEditing ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '8px' }}>
            {[
              ['email', 'Email'],
              ['phone', 'Phone'],
              ['location', 'Location'],
              ['linkedin', 'LinkedIn URL'],
              ['github', 'GitHub URL'],
            ].map(([field, placeholder]) => (
              <input
                key={field}
                style={inputStyle}
                value={personalInfo?.[field] || ''}
                onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: e.target.value } }))}
                placeholder={placeholder}
              />
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '6px',
            fontSize: '11.5px',
            color: '#374151',
          }}>
            {[
              personalInfo?.email && makeLink(personalInfo.email, `mailto:${personalInfo.email}`),
              personalInfo?.phone,
              personalInfo?.location,
              personalInfo?.linkedin && makeLink(personalInfo.linkedin, `https://${personalInfo.linkedin}`),
              personalInfo?.github && makeLink(personalInfo.github, `https://${personalInfo.github}`),
            ].filter(Boolean).map((item, i, arr) => (
              <React.Fragment key={i}>
                <span>{item}</span>
                {i < arr.length - 1 && <span style={{ color: '#9ca3af' }}>|</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Summary */}
        {(aboutMe?.[0]?.about || isEditing) && (
          <div>
            <SectionTitle>Summary</SectionTitle>
            {isEditing ? (
              <textarea
                style={textareaStyle}
                value={aboutMe?.[0]?.about || ''}
                onChange={(e) => setEditedResume(prev => ({
                  ...prev,
                  aboutMe: [{ ...(prev.aboutMe?.[0] || {}), about: e.target.value }],
                }))}
                placeholder="Write a professional summary..."
              />
            ) : (
              <p style={{ fontSize: '12.5px', lineHeight: '1.65', color: '#1f2937', margin: 0 }}>
                {aboutMe[0].about}
              </p>
            )}
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <SectionTitle>Skills</SectionTitle>
            {isEditing ? (
              <textarea
                style={textareaStyle}
                value={skills.join(', ')}
                onChange={(e) => setEditedResume(prev => ({
                  ...prev,
                  skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                }))}
                placeholder="Skill1, Skill2, Skill3 ..."
              />
            ) : (
              <p style={{ fontSize: '12.5px', color: '#1f2937', margin: 0, lineHeight: '1.6' }}>
                {skills.join(' · ')}
              </p>
            )}
          </div>
        )}

        {/* Education */}
        {education?.college && (
          <div>
            <SectionTitle>Education</SectionTitle>
            {isEditing ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  ['college', 'College / University'],
                  ['degree', 'Degree'],
                  ['branch', 'Branch / Major'],
                  ['year', 'Year'],
                  ['cgpa', 'CGPA'],
                ].map(([field, placeholder]) => (
                  <input
                    key={field}
                    style={inputStyle}
                    value={education?.[field] || ''}
                    onChange={(e) => setEditedResume(prev => ({ ...prev, education: { ...prev.education, [field]: e.target.value } }))}
                    placeholder={placeholder}
                  />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>{education.college}</div>
                  <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '1px' }}>{education.degree}, {education.branch}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                  <div>{education.year}</div>
                  {education.cgpa && <div style={{ fontWeight: '600', color: '#111827' }}>CGPA: {education.cgpa}</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Experience */}
        {!isFresher && experience?.length > 0 && (
          <div>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                      <input style={inputStyle} value={exp.role || ''} placeholder="Role" onChange={(e) => {
                        const updated = [...experience]; updated[i] = { ...updated[i], role: e.target.value };
                        setEditedResume(prev => ({ ...prev, experience: updated }));
                      }} />
                      <input style={inputStyle} value={exp.company || ''} placeholder="Company" onChange={(e) => {
                        const updated = [...experience]; updated[i] = { ...updated[i], company: e.target.value };
                        setEditedResume(prev => ({ ...prev, experience: updated }));
                      }} />
                      <input style={inputStyle} value={exp.duration || ''} placeholder="Duration" onChange={(e) => {
                        const updated = [...experience]; updated[i] = { ...updated[i], duration: e.target.value };
                        setEditedResume(prev => ({ ...prev, experience: updated }));
                      }} />
                    </div>
                    <textarea
                      style={textareaStyle}
                      value={exp.points?.join('\n') || exp.description || ''}
                      placeholder="One bullet point per line..."
                      onChange={(e) => {
                        const updated = [...experience];
                        updated[i] = { ...updated[i], points: e.target.value.split('\n').filter(p => p.trim() !== '') };
                        setEditedResume(prev => ({ ...prev, experience: updated }));
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>{exp.role}</span>
                        <span style={{ fontSize: '12.5px', color: '#374151' }}>, {exp.company}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>{exp.duration}</span>
                    </div>
                    <ul style={{ margin: '5px 0 0 16px', padding: 0 }}>
                      {(exp.points?.length > 0 ? exp.points : exp.description?.split('\n'))
                        ?.filter(p => p.trim())
                        ?.map((point, j) => (
                          <li key={j} style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6', marginBottom: '2px' }}>
                            {point.replace(/^[-•]\s*/, '')}
                          </li>
                        ))}
                    </ul>
                  </>
                )}
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
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <input style={inputStyle} value={p.name || ''} placeholder="Project Name" onChange={(e) => {
                        const updated = [...projects]; updated[i] = { ...updated[i], name: e.target.value };
                        setEditedResume(prev => ({ ...prev, projects: updated }));
                      }} />
                      <input style={inputStyle} value={p.techStack || ''} placeholder="Tech Stack" onChange={(e) => {
                        const updated = [...projects]; updated[i] = { ...updated[i], techStack: e.target.value };
                        setEditedResume(prev => ({ ...prev, projects: updated }));
                      }} />
                    </div>
                    <textarea
                      style={textareaStyle}
                      value={p.points?.join('\n') || p.description || ''}
                      placeholder="One bullet point per line..."
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[i] = { ...updated[i], points: e.target.value.split('\n').filter(pt => pt.trim() !== '') };
                        setEditedResume(prev => ({ ...prev, projects: updated }));
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>{p.name}</span>
                      <span style={{ fontSize: '11.5px', color: '#6b7280', fontStyle: 'italic' }}>{p.techStack}</span>
                    </div>
                    <ul style={{ margin: '5px 0 0 16px', padding: 0 }}>
                      {(p.points?.length > 0 ? p.points : p.description?.split('\n'))
                        ?.filter(pt => pt.trim())
                        ?.map((point, j) => (
                          <li key={j} style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6', marginBottom: '2px' }}>
                            {point.replace(/^[-•]\s*/, '')}
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveClean;