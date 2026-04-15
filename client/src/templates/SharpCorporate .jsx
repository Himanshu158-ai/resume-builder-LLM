import React from 'react';

const SharpCorporate = ({ aboutMe, skills, education, experience, projects, personalInfo, isEditing, setEditedResume, isFresher }) => {

  const makeLink = (text, href) => (
    <a href={href} target="_blank" rel="noreferrer" style={{ color: '#c0392b', textDecoration: 'none' }}>
      {text}
    </a>
  );

  const SectionTitle = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px', gap: '0' }}>
      <div style={{
        background: '#c0392b',
        width: '4px',
        height: '18px',
        marginRight: '10px',
        borderRadius: '1px',
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: '11px',
        fontWeight: '800',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: '#1c1c1c',
        fontFamily: "'Barlow', 'Arial Narrow', Arial, sans-serif",
      }}>{children}</span>
    </div>
  );

  const inputStyle = {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '3px',
    padding: '6px 8px',
    fontSize: '12px',
    fontFamily: "'Barlow', Arial, sans-serif",
    color: '#1c1c1c',
    background: '#fff',
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
        background: '#f9f9f7',
        margin: '0 auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        fontFamily: "'Barlow', Arial, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* TOP ACCENT BAR */}
      <div style={{ height: '6px', background: 'linear-gradient(90deg, #c0392b, #e74c3c, #ff6b6b)' }} />

      {/* HEADER */}
      <div style={{
        background: '#1c1c1c',
        padding: '28px 48px 24px',
        position: 'relative',
      }}>
        {/* Decorative element */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '120px',
          background: 'rgba(192, 57, 43, 0.15)',
          clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)'
        }} />

        {isEditing ? (
          <input
            style={{ ...inputStyle, fontSize: '22px', fontWeight: '800', background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', marginBottom: '10px' }}
            value={personalInfo?.name || ''}
            onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, name: e.target.value } }))}
            placeholder="Your Name"
          />
        ) : (
          <h1 style={{
            color: '#ffffff',
            fontSize: '32px',
            fontWeight: '800',
            margin: '0 0 4px 0',
            letterSpacing: '-0.5px',
            fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
            textTransform: 'uppercase',
          }}>
            {personalInfo?.name}
          </h1>
        )}

        {isEditing ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '8px' }}>
            {[['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['linkedin', 'LinkedIn'], ['github', 'GitHub']].map(([field, ph]) => (
              <input
                key={field}
                style={{ ...inputStyle, background: 'rgba(255,255,255,0.1)', color: '#e0e0e0', border: '1px solid rgba(255,255,255,0.2)', fontSize: '11px' }}
                value={personalInfo?.[field] || ''}
                onChange={(e) => setEditedResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: e.target.value } }))}
                placeholder={ph}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '10px' }}>
            {[
              personalInfo?.email && { label: personalInfo.email, href: `mailto:${personalInfo.email}` },
              personalInfo?.phone && { label: personalInfo.phone },
              personalInfo?.location && { label: personalInfo.location },
              personalInfo?.linkedin && { label: personalInfo.linkedin, href: `https://${personalInfo.linkedin}` },
              personalInfo?.github && { label: personalInfo.github, href: `https://${personalInfo.github}` },
            ].filter(Boolean).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '3px', height: '3px', background: '#c0392b', borderRadius: '50%' }} />
                {item.href
                  ? <a href={item.href} target="_blank" rel="noreferrer" style={{ color: '#e0e0e0', fontSize: '11.5px', textDecoration: 'none' }}>{item.label}</a>
                  : <span style={{ color: '#e0e0e0', fontSize: '11.5px' }}>{item.label}</span>
                }
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BODY */}
      <div style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '26px' }}>

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
                fontSize: '12.5px', lineHeight: '1.7', color: '#2c2c2c', margin: 0,
                paddingLeft: '14px', borderLeft: '2px solid #e8e8e4'
              }}>
                {aboutMe[0].about}
              </p>
            )}
          </div>
        )}

        {/* Two-column: Skills + Education */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Skills */}
          {skills?.length > 0 && (
            <div>
              <SectionTitle>Core Skills</SectionTitle>
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
                      fontSize: '10.5px',
                      padding: '3px 10px',
                      background: '#ffffff',
                      border: '1px solid #ddd',
                      borderRadius: '2px',
                      color: '#1c1c1c',
                      fontWeight: '600',
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1c1c1c', marginBottom: '2px' }}>{education.college}</div>
                  <div style={{ fontSize: '11.5px', color: '#555' }}>{education.degree} — {education.branch}</div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#888' }}>{education.year}</span>
                    {education.cgpa && <span style={{ fontSize: '11px', color: '#c0392b', fontWeight: '700' }}>CGPA: {education.cgpa}</span>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

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
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '4px',
                    padding: '14px 16px',
                    borderLeft: '3px solid #c0392b',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#1c1c1c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.role}</span>
                        <span style={{ fontSize: '12px', color: '#666' }}> @ {exp.company}</span>
                      </div>
                      <span style={{ fontSize: '10.5px', color: '#c0392b', fontWeight: '700' }}>{exp.duration}</span>
                    </div>
                    <ul style={{ margin: '0', paddingLeft: '16px' }}>
                      {(exp.points?.length > 0 ? exp.points : exp.description?.split('\n'))
                        ?.filter(p => p.trim())
                        ?.map((point, j) => (
                          <li key={j} style={{ fontSize: '12px', color: '#333', lineHeight: '1.6', marginBottom: '3px' }}>
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

        {/* Projects */}
        {projects?.length > 0 && (
          <div>
            <SectionTitle>Projects</SectionTitle>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projects.map((p, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px', background: '#fff', borderRadius: '4px', border: '1px solid #eee' }}>
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
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {projects.map((p, i) => (
                  <div key={i} style={{
                    background: '#ffffff',
                    borderRadius: '4px',
                    padding: '14px 16px',
                    borderTop: '3px solid #c0392b',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#1c1c1c', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#c0392b', marginBottom: '6px', fontWeight: '600' }}>{p.techStack}</div>
                    <ul style={{ margin: 0, paddingLeft: '14px' }}>
                      {(p.points?.length > 0 ? p.points : p.description?.split('\n'))
                        ?.filter(pt => pt.trim())
                        ?.map((point, j) => (
                          <li key={j} style={{ fontSize: '11.5px', color: '#444', lineHeight: '1.55', marginBottom: '2px' }}>
                            {point.replace(/^[-•]\s*/, '')}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharpCorporate;