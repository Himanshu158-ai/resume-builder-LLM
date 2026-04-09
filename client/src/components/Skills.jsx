import { useState } from "react";

export default function Skills({ data, setData }) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const vals = input.split(",").map(s => s.trim()).filter(Boolean);
    setData(prev => ({ ...prev, skills: [...prev.skills, ...vals] }));
    setInput("");
  };

  const removeSkill = (i) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="input flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addSkill()}
          placeholder="React, Node.js, MongoDB"
        />
        <button onClick={addSkill} className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          + Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, i) => (
          <span key={i} className="bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-transparent dark:border-blue-800">
            {skill}
            <button onClick={() => removeSkill(i)} className="text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition">×</button>
          </span>
        ))}
      </div>
    </div>
  );
}