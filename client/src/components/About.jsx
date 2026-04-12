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

  const inputStyle =
    "w-full px-3 py-2.5 rounded-lg " +
    "bg-white/80 backdrop-blur-md " +
    "border border-gray-200 " +
    "text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition";

  return (
    <div className="space-y-4">

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          About You
        </label>

        <textarea
          required
          className={`${inputStyle} min-h-[90px]`}
          value={data.aboutMe?.[0]?.about || ""}
          onChange={e =>
            update("about", e.target.value)
          }
          placeholder="Brief intro about yourself..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Target Role <span className="text-xs text-gray-500">(Optional)</span>
        </label>

        <input
          className={inputStyle}
          value={data.aboutMe?.[0]?.target || ""}
          onChange={e =>
            update("target", e.target.value)
          }
          placeholder="e.g. Frontend Developer, React Developer, Software Engineer"
        />
      </div>

    </div>
  );
};

export default About;