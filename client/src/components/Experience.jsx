export default function Experience({ data, setData }) {
  const update = (i, field, value) => {
    setData(prev => {
      const updated = [...prev.experience];
      updated[i] = { ...updated[i], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const addExp = () => {
    setData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", role: "", duration: "", description: "" }
      ]
    }));
  };

  const removeExp = (i) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== i)
    }));
  };

  const inputStyle = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none transition-all duration-200";

  return (
   <div className="space-y-5">

  {/* Fresher checkbox */}
  <label className="inline-flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={data.isFresher}
        onChange={e => setData(prev => ({ ...prev, isFresher: e.target.checked }))}
      />
      <div className="w-4 h-4 rounded-[4px] border border-white/[0.15] bg-[#0A0A0A] peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all duration-200 flex items-center justify-center">
        {data.isFresher && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
    <span className="text-[13px] text-[#A1A1AA] group-hover:text-white transition-colors duration-200">
      I am a fresher (no experience)
    </span>
  </label>

  {!data.isFresher && (
    <>
      {data.experience.map((exp, i) => (
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
                Experience {i + 1}
              </span>
            </div>

            {data.experience.length > 1 && (
              <button
                onClick={() => removeExp(i)}
                className="text-[11px] text-[#71717A] hover:text-red-400 border border-white/[0.06] hover:border-red-500/20 px-2.5 py-1 rounded-lg transition-all duration-200"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Company", key: "company", placeholder: "Google" },
              { label: "Role", key: "role", placeholder: "Frontend Developer" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
                  {label}
                </label>
                <input
                  required
                  className={inputStyle}
                  value={exp[key]}
                  onChange={e => update(i, key, e.target.value)}
                  placeholder={placeholder}
                />
              </div>
            ))}

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
                Duration
              </label>
              <input
                required
                className={inputStyle}
                value={exp.duration}
                onChange={e => update(i, "duration", e.target.value)}
                placeholder="Jan 2023 – Dec 2023"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
              What you did
            </label>
            <textarea
              required
              className={`${inputStyle} min-h-[90px] resize-none`}
              value={exp.description}
              onChange={e => update(i, "description", e.target.value)}
              placeholder="Describe your responsibilities and impact..."
            />
          </div>
        </div>
      ))}

      {/* Add button */}
      <button
        onClick={addExp}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 
          bg-white/[0.03] hover:bg-white/[0.06]
          border border-dashed border-white/[0.10] hover:border-indigo-500/30
          text-[12px] text-[#71717A] hover:text-indigo-400
          rounded-xl transition-all duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add experience
      </button>
    </>
  )}

</div>
  );
}
