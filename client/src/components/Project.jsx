export default function Projects({ data, setData }) {
  const update = (i, field, value) => {
    setData(prev => {
      const updated = [...prev.projects];
      updated[i] = { ...updated[i], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", techStack: "", description: "" }
      ]
    }));
  };

  const removeProject = (i) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== i)
    }));
  };

  const inputStyle = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none transition-all duration-200";

  return (
    <div className="space-y-5">

  {data.projects.map((p, i) => (
    <div
      key={i}
      className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 space-y-5"
    >
      {/* Card header */}
      <div className="flex justify-between items-center pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <span className="text-[10px] text-indigo-400 font-semibold">{i + 1}</span>
          </div>
          <span className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
            Project {i + 1}
          </span>
        </div>

        {data.projects.length > 1 && (
          <button
            onClick={() => removeProject(i)}
            className="text-[11px] text-[#71717A] hover:text-red-400 border border-white/[0.06] hover:border-red-500/20 px-2.5 py-1 rounded-lg transition-all duration-200"
          >
            Remove
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { label: "Project Name", key: "name",      placeholder: "AI Resume Builder"        },
          { label: "Tech Stack",   key: "techStack",  placeholder: "React, Node.js, Tailwind" },
        ].map(({ label, key, placeholder }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
              {label}
            </label>
            <input
              required
              className={inputStyle}
              value={p[key]}
              onChange={e => update(i, key, e.target.value)}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
          Description
        </label>
        <textarea
          required
          className={`${inputStyle} min-h-[90px] resize-none`}
          value={p.description}
          onChange={e => update(i, "description", e.target.value)}
          placeholder="Describe what you built and the impact it had..."
        />
      </div>

    </div>
  ))}

  {/* Add button */}
  <button
    onClick={addProject}
    className="w-full flex items-center justify-center gap-2 px-4 py-3
      bg-white/[0.03] hover:bg-white/[0.06]
      border border-dashed border-white/[0.10] hover:border-indigo-500/30
      text-[12px] text-[#71717A] hover:text-indigo-400
      rounded-xl transition-all duration-200"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
    Add project
  </button>

</div>
  );
}