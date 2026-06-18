import { useState } from "react";

export default function Skills({ data, setData }) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const vals = input
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    setData(prev => ({
      ...prev,
      skills: [...prev.skills, ...vals]
    }));

    setInput("");
  };

  const removeSkill = (i) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== i)
    }));
  };

  const inputStyle = "w-full bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.14] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none transition-all duration-200";

  return (
    <div className="space-y-4">

  {/* Input row */}
  <div className="flex gap-2">
    <input
      required
      className={`${inputStyle} flex-1`}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={e => e.key === "Enter" && addSkill()}
      placeholder="Type a skill and press Enter or Add..."
    />
    <button
      onClick={addSkill}
      className="inline-flex items-center gap-1.5 px-4 py-2.5
        bg-indigo-600 hover:bg-indigo-500
        text-white text-[13px] font-semibold
        rounded-xl transition-all duration-200
        whitespace-nowrap"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
      Add
    </button>
  </div>

  {/* Skills tags */}
  {data.skills.length > 0 && (
    <div className="flex flex-wrap gap-2 pt-1">
      {data.skills.map((skill, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2
            bg-indigo-500/[0.08] hover:bg-indigo-500/[0.12]
            border border-indigo-500/[0.18]
            text-indigo-300 text-[12px] font-medium
            px-3 py-1.5 rounded-lg
            transition-all duration-200"
        >
          {skill}
          <button
            onClick={() => removeSkill(i)}
            className="text-indigo-400/60 hover:text-red-400 transition-colors duration-200 leading-none"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </span>
      ))}
    </div>
  )}

  {/* Empty state */}
  {data.skills.length === 0 && (
    <p className="text-[12px] text-[#71717A] pl-1">
      No skills added yet type above and hit Add or Enter.
    </p>
  )}

</div>
  );
}