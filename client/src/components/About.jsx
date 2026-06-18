import React from "react";

const About = ({ data, setData }) => {

  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      aboutMe: Array.isArray(prev.aboutMe) 
        ? prev.aboutMe.map((item, index) =>
          index === 0 ? { ...item, [field]: value } : item
        )
        : [{ about: "", target: "", [field]: value }]
    }));
  };

  const inputStyle = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none transition-all duration-200";

  return (
    <div className="space-y-5">

  <div className="flex flex-col gap-2">
    <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest">
      About You
    </label>
    <textarea
      aria-required
      className="min-h-[100px] w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] resize-none outline-none transition-all duration-200"
      value={data.aboutMe?.[0]?.about || ""}
      onChange={e => update("about", e.target.value)}
      placeholder="Brief intro about yourself..."
    />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-widest flex items-center gap-2">
      Target Role
      <span className="normal-case tracking-normal text-[11px] text-[#71717A] font-normal border border-white/[0.08] px-2 py-0.5 rounded-md">Optional</span>
    </label>
    <input
      className="w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none transition-all duration-200"
      value={data.aboutMe?.[0]?.target || ""}
      onChange={e => update("target", e.target.value)}
      placeholder="e.g. Frontend Developer, React Developer"
    />
  </div>

</div>
  );
};

export default About;