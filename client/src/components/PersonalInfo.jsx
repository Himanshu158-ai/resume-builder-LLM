export default function PersonalInfo({ data, setData }) {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const inputStyle = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none transition-all duration-200";

  return (
    <div className="space-y-4">
  <div className="grid md:grid-cols-2 gap-4">

    {[
      { label: "Full Name",  key: "name",     placeholder: "Himanshu Singh",     required: true  },
      { label: "Email",      key: "email",    placeholder: "your@email.com",     required: true  },
      { label: "Phone",      key: "phone",    placeholder: "+91 XXXXX XXXXX",    required: true  },
      { label: "Location",   key: "location", placeholder: "Delhi, India",       required: true  },
      { label: "LinkedIn",   key: "linkedin", placeholder: "linkedin.com/in/...", required: true },
      { label: "GitHub",     key: "github",   placeholder: "github.com/...",     required: true },
    ].map(({ label, key, placeholder, required }) => (
      <div key={key} className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
          {label}
          {!required && (
            <span className="normal-case tracking-normal text-[11px] text-[#71717A] font-normal border border-white/[0.08] px-2 py-0.5 rounded-md">
              Optional
            </span>
          )}
        </label>
        <input
          required={required}
          className={inputStyle}
          value={data.personalInfo[key]}
          onChange={e => update(key, e.target.value)}
          placeholder={placeholder}
        />
      </div>
    ))}

  </div>
</div>
  );
}