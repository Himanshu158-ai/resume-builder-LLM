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

  const inputStyle =
    "w-full px-3 py-2.5 rounded-lg " +
    "bg-white/80 backdrop-blur-md " +
    "border border-gray-200 " +
    "text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 " +
    "transition";

  return (
    <div className="space-y-4">

      <div className="flex gap-2">
        <input
          className={`${inputStyle} flex-1`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addSkill()}
          placeholder="React, Node.js, MongoDB"
        />

        <button
          onClick={addSkill}
          className="bg-white/40 backdrop-blur-lg 
          border border-white/40 
          px-4 py-2 
          rounded-lg 
          text-sm 
          hover:bg-white/60 
          transition"
        >
          + Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 
            bg-gradient-to-r from-blue-500/10 to-indigo-500/10
            border border-blue-200/40
            text-gray-800
            text-xs px-3 py-1.5 
            rounded-full 
            backdrop-blur-md"
          >
            {skill}

            <button
              onClick={() => removeSkill(i)}
              className="text-blue-500 hover:text-red-500 transition"
            >
              ×
            </button>
          </span>
        ))}
      </div>

    </div>
  );
}