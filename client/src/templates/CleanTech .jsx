import React from 'react';

const CleanTech = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, isFresher }) => {

  const makeLink = (text, href) => (
    <a href={href} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', textDecoration: 'none' }}>
      {text}
    </a>
  );

  const SectionTitle = ({ children }) => (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '10px',
          color: '#0ea5e9',
          fontWeight: '700',
        }}>{'// '}</span>
        <span style={{
          fontSize: '10px',
          fontWeight: '700',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#0f172a',
          fontFamily: "'DM Mono', 'Courier New', monospace",
        }}>{children}</span>
      </div>
      <div style={{ height: '1px', background: 'linear-gradient(90deg, #0ea5e9, transparent)', marginTop: '6px' }} />
    </div>
  );

  const inputStyle = {
    width: '100%',
    border: '1px solid #bae6fd',
    borderRadius: '4px',
    padding: '6px 8px',
    fontSize: '12px',
    fontFamily: "'DM Sans', Arial, sans-serif",
    color: '#0f172a',
    background: '#f0f9ff',
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
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        fontFamily: "'DM Sans', Arial, sans-serif",
        position: 'relative',
      }}
    >
      {/* LEFT accent line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
        background: 'linear-gradient(180deg, #0ea5e9, #6366f1)'
      }} />

      <div style={{ paddingLeft: '4px' }}>
        {/* HEADER */}
        <div style={{
          padding: '32px 40px 28px 40px',
          borderBottom: '1px solid #e2e8f0',
          background: '#fafbff',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: '10px',
                color: '#0ea5e9',
                marginBottom: '6px',
                letterSpacing: '1px',
              }}>
                &lt;resume&gt;
              </div>
              {isEditing ? (
                <input
                  style={{ ...inputStyle, fontSize: '20px', fontWeight: '800' }}
                  value={personalInfo?.name || ''}
                  onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, name: e.target.value } }))}
                  placeholder="Your Name"
                />
              ) : (
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#0f172a',
                  margin: 0,
                  letterSpacing: '-0.5px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {personalInfo?.name}
                </h1>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', fontSize: '11px', color: '#475569' }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '200px' }}>
                  {[['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['linkedin', 'LinkedIn'], ['github', 'GitHub']].map(([field, ph]) => (
                    <input
                      key={field}
                      style={inputStyle}
                      value={personalInfo?.[field] || ''}
                      onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: e.target.value } }))}
                      placeholder={ph}
                    />
                  ))}
                </div>
              ) : (
                <>
                  {personalInfo?.email && <span>{makeLink(personalInfo.email, `mailto:${personalInfo.email}`)}</span>}
                  {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo?.location && <span>{personalInfo.location}</span>}
                  {personalInfo?.linkedin && <span>{makeLink(personalInfo.linkedin, `https://${personalInfo.linkedin}`)}</span>}
                  {personalInfo?.github && <span>{makeLink(personalInfo.github, `https://${personalInfo.github}`)}</span>}
                </>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

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
                <p style={{
                  fontSize: '12.5px', lineHeight: '1.7', color: '#334155', margin: 0,
                  background: '#f8fafc', padding: '12px 14px', borderRadius: '6px',
                  borderLeft: '3px solid #0ea5e9',
                }}>
                  {aboutMe[0].about}
                </p>
              )}
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div>
              <SectionTitle>Tech Stack</SectionTitle>
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skills.map((skill, i) => (
                    <span key={i} style={{
                      fontFamily: "'DM Mono', 'Courier New', monospace",
                      fontSize: '10.5px',
                      padding: '3px 10px',
                      background: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      borderRadius: '4px',
                      color: '#0369a1',
                      fontWeight: '500',
                    }}>{skill}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {education?.college && (
            <div>
              <SectionTitle>Education</SectionTitle>
              {isEditing ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {[['college', 'College'], ['degree', 'Degree'], ['branch', 'Branch'], ['year', 'Year'], ['cgpa', 'CGPA']].map(([field, ph]) => (
                    <input
                      key={field}
                      style={inputStyle}
                      value={education?.[field] || ''}
                      onChange={(e) => setEditedResume(prev => ({ ...prev, education: { ...prev.education, [field]: e.target.value } }))}
                      placeholder={ph}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  flexWrap: 'wrap', gap: '8px',
                  padding: '12px 14px',
                  background: '#f8fafc', borderRadius: '6px',
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{education.college}</div>
                    <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>{education.degree} — {education.branch}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{education.year}</div>
                    {education.cgpa && (
                      <div style={{ fontSize: '11px', color: '#0ea5e9', fontWeight: '700', fontFamily: "'DM Mono', monospace" }}>
                        CGPA: {education.cgpa}
                      </div>
                    )}
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{exp.role}</span>
                          <span style={{ fontSize: '12px', color: '#64748b' }}> @ {exp.company}</span>
                        </div>
                        <span style={{
                          fontSize: '10px', color: '#0ea5e9',
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: '600',
                          background: '#f0f9ff',
                          padding: '2px 8px', borderRadius: '4px'
                        }}>{exp.duration}</span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {(exp.points?.length > 0 ? exp.points : exp.description?.split('\n'))
                          ?.filter(p => p.trim())
                          ?.map((point, j) => (
                            <li key={j} style={{ fontSize: '12px', color: '#475569', lineHeight: '1.65', marginBottom: '3px' }}>
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
                <div key={i} style={{ marginBottom: '16px' }}>
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
                    <div style={{
                      padding: '14px 16px',
                      background: '#f8fafc',
                      borderRadius: '6px',
                      borderLeft: '3px solid #6366f1',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{p.name}</span>
                        <span style={{
                          fontSize: '10px', color: '#6366f1',
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: '600',
                          background: '#eef2ff', padding: '2px 8px', borderRadius: '4px'
                        }}>{p.techStack}</span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {(p.points?.length > 0 ? p.points : p.description?.split('\n'))
                          ?.filter(pt => pt.trim())
                          ?.map((point, j) => (
                            <li key={j} style={{ fontSize: '12px', color: '#475569', lineHeight: '1.65', marginBottom: '3px' }}>
                              {point.replace(/^[-•]\s*/, '')}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Closing tag */}
          <div style={{
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontSize: '10px', color: '#94a3b8', marginTop: '4px'
          }}>
            &lt;/resume&gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanTech;