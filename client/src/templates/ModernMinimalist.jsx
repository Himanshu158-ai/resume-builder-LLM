import React from 'react';

const ModernMinimalist = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, isFresher }) => {

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

  const inputDarkStyle = {
    width: '100%',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '4px',
    padding: '5px 7px',
    fontSize: '11px',
    fontFamily: "'DM Sans', Arial, sans-serif",
    color: '#ffffff',
    background: 'rgba(255,255,255,0.1)',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const inputLightStyle = {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '6px 8px',
    fontSize: '12px',
    fontFamily: "'DM Sans', Arial, sans-serif",
    color: '#1a1a2e',
    background: '#f9fafb',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const textareaLightStyle = {
    ...inputLightStyle,
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
          {isEditing ? (
            <input
              style={inputDarkStyle}
              value={personalInfo?.name || ''}
              onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, name: e.target.value } }))}
              placeholder="Your Name"
            />
          ) : (
            <h1 style={{
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: '700',
              lineHeight: 1.2,
              margin: 0,
              fontFamily: "'DM Serif Display', Georgia, serif",
            }}>
              {personalInfo?.name?.split(' ')[0]}<br />
              <span style={{ color: '#e8c547' }}>{personalInfo?.name?.split(' ').slice(1).join(' ')}</span>
            </h1>
          )}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#e8c547', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>Contact</div>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['linkedin', 'LinkedIn'], ['github', 'GitHub']].map(([field, ph]) => (
                <input
                  key={field}
                  style={inputDarkStyle}
                  value={personalInfo?.[field] || ''}
                  onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: e.target.value } }))}
                  placeholder={ph}
                />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {personalInfo?.email && <div style={{ fontSize: '11px', color: '#c8c8d8', wordBreak: 'break-all' }}>{personalInfo.email}</div>}
              {personalInfo?.phone && <div style={{ fontSize: '11px', color: '#c8c8d8' }}>{personalInfo.phone}</div>}
              {personalInfo?.location && <div style={{ fontSize: '11px', color: '#c8c8d8' }}>{personalInfo.location}</div>}
              {personalInfo?.linkedin && <div style={{ fontSize: '11px', color: '#e8c547' }}>{makeLink(personalInfo.linkedin, `https://${personalInfo.linkedin}`)}</div>}
              {personalInfo?.github && <div style={{ fontSize: '11px', color: '#e8c547' }}>{makeLink(personalInfo.github, `https://${personalInfo.github}`)}</div>}
            </div>
          )}
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#e8c547', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>Skills</div>
            {isEditing ? (
              <textarea
                style={{ ...inputDarkStyle, resize: 'vertical', minHeight: '72px', lineHeight: '1.6' }}
                value={skills.join(', ')}
                onChange={(e) => setEditedResume(prev => ({
                  ...prev,
                  skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                }))}
                placeholder="Skill1, Skill2, ..."
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {skills.map((skill, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '4px', height: '4px', background: '#e8c547', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: '#c8c8d8' }}>{skill}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education in sidebar */}
        {education?.college && (
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#e8c547', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>Education</div>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {[['college', 'College'], ['degree', 'Degree'], ['branch', 'Branch'], ['year', 'Year'], ['cgpa', 'CGPA']].map(([field, ph]) => (
                  <input
                    key={field}
                    style={inputDarkStyle}
                    value={education?.[field] || ''}
                    onChange={(e) => setEditedResume(prev => ({ ...prev, education: { ...prev.education, [field]: e.target.value } }))}
                    placeholder={ph}
                  />
                ))}
              </div>
            ) : (
              <>
                <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: '600', marginBottom: '3px' }}>{education.college}</div>
                <div style={{ fontSize: '11px', color: '#c8c8d8', marginBottom: '2px' }}>{education.degree}</div>
                <div style={{ fontSize: '11px', color: '#c8c8d8', marginBottom: '2px' }}>{education.branch}</div>
                <div style={{ fontSize: '10px', color: '#8888a8' }}>{education.year}</div>
                {education.cgpa && <div style={{ fontSize: '10px', color: '#e8c547', marginTop: '3px' }}>CGPA: {education.cgpa}</div>}
              </>
            )}
          </div>
        )}
      </div>

      {/* RIGHT MAIN */}
      <div style={{ flex: 1, padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Summary */}
        {(aboutMe?.[0]?.about || isEditing) && (
          <div>
            <SectionTitle>Professional Summary</SectionTitle>
            {isEditing ? (
              <textarea
                style={textareaLightStyle}
                value={aboutMe?.[0]?.about || ''}
                onChange={(e) => setEditedResume(prev => ({
                  ...prev,
                  aboutMe: [{ ...(prev.aboutMe?.[0] || {}), about: e.target.value }],
                }))}
                placeholder="Write a professional summary..."
              />
            ) : (
              <p style={{ fontSize: '12.5px', lineHeight: 1.65, color: '#333344', margin: 0 }}>
                {aboutMe[0].about}
              </p>
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
                      <input style={inputLightStyle} value={exp.role || ''} placeholder="Role" onChange={(e) => {
                        const updated = [...experience]; updated[i] = { ...updated[i], role: e.target.value };
                        setEditedResume(prev => ({ ...prev, experience: updated }));
                      }} />
                      <input style={inputLightStyle} value={exp.company || ''} placeholder="Company" onChange={(e) => {
                        const updated = [...experience]; updated[i] = { ...updated[i], company: e.target.value };
                        setEditedResume(prev => ({ ...prev, experience: updated }));
                      }} />
                      <input style={inputLightStyle} value={exp.duration || ''} placeholder="Duration" onChange={(e) => {
                        const updated = [...experience]; updated[i] = { ...updated[i], duration: e.target.value };
                        setEditedResume(prev => ({ ...prev, experience: updated }));
                      }} />
                    </div>
                    <textarea
                      style={textareaLightStyle}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{exp.role}</span>
                        <span style={{ fontSize: '12px', color: '#555566' }}> · {exp.company}</span>
                      </div>
                      <span style={{
                        fontSize: '10px', color: '#ffffff', background: '#1a1a2e',
                        padding: '2px 8px', borderRadius: '10px', fontWeight: '600'
                      }}>{exp.duration}</span>
                    </div>
                    <ul style={{ margin: '6px 0 0 16px', padding: 0, listStyle: 'disc' }}>
                      {(exp.points?.length > 0 ? exp.points : exp.description?.split('\n'))
                        ?.filter(p => p.trim())
                        ?.map((point, j) => (
                          <li key={j} style={{ fontSize: '12px', color: '#444455', lineHeight: 1.6, marginBottom: '3px' }}>
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
                      <input style={inputLightStyle} value={p.name || ''} placeholder="Project Name" onChange={(e) => {
                        const updated = [...projects]; updated[i] = { ...updated[i], name: e.target.value };
                        setEditedResume(prev => ({ ...prev, projects: updated }));
                      }} />
                      <input style={inputLightStyle} value={p.techStack || ''} placeholder="Tech Stack" onChange={(e) => {
                        const updated = [...projects]; updated[i] = { ...updated[i], techStack: e.target.value };
                        setEditedResume(prev => ({ ...prev, projects: updated }));
                      }} />
                    </div>
                    <textarea
                      style={textareaLightStyle}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{p.name}</span>
                      <span style={{ fontSize: '10px', color: '#e8c547', fontWeight: '600', background: '#1a1a2e', padding: '2px 8px', borderRadius: '10px' }}>
                        {p.techStack}
                      </span>
                    </div>
                    <ul style={{ margin: '6px 0 0 16px', padding: 0, listStyle: 'disc' }}>
                      {(p.points?.length > 0 ? p.points : p.description?.split('\n'))
                        ?.filter(pt => pt.trim())
                        ?.map((point, j) => (
                          <li key={j} style={{ fontSize: '12px', color: '#444455', lineHeight: 1.6, marginBottom: '3px' }}>
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

export default ModernMinimalist;