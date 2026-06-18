export default function Education({ data, setData }) {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  const inputStyle = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none transition-all duration-200";

  return (
    <div className="grid md:grid-cols-2 gap-4">

  {[
    { label: "College / University", key: "college", placeholder: "IIT Delhi", required: true },
    { label: "Degree", key: "degree", placeholder: "B.Tech", required: true },
    { label: "Branch", key: "branch", placeholder: "Computer Science", required: true },
    { label: "Year", key: "year", placeholder: "2022 – 2026", required: true },
  ].map(({ label, key, placeholder, required }) => (
    <div key={key} className="flex flex-col gap-2">
      <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
        {label}
      </label>
      <input
        required={required}
        className={inputStyle}
        value={data.education[key]}
        onChange={e => update(key, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  ))}

  <div className="flex flex-col gap-2 md:col-span-2">
    <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
      CGPA / Percentage
      <span className="normal-case tracking-normal text-[11px] text-[#71717A] font-normal border border-white/[0.08] px-2 py-0.5 rounded-md">Optional</span>
    </label>
    <input
      className={inputStyle}
      value={data.education.cgpa}
      onChange={e => update("cgpa", e.target.value)}
      placeholder="8.5 / 10"
    />
  </div>

</div>
  );
}