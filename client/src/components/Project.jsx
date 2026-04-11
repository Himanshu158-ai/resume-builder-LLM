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

  const inputStyle =
    "w-full px-3 py-2.5 rounded-lg " +
    "bg-white/80 backdrop-blur-md " +
    "border border-gray-200 " +
    "text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "transition";

  return (
    <div className="space-y-5">

      {data.projects.map((p, i) => (
        <div
          key={i}
          className="bg-white/40 backdrop-blur-xl 
          border border-white/40 
          rounded-xl p-5 space-y-4"
        >

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">
              Project {i + 1}
            </span>

            {data.projects.length > 1 && (
              <button
                onClick={() => removeProject(i)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-3">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Project name
              </label>
              <input
                className={inputStyle}
                value={p.name}
                onChange={e => update(i, "name", e.target.value)}
                placeholder="AI Resume Builder"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Tech stack
              </label>
              <input
                className={inputStyle}
                value={p.techStack}
                onChange={e => update(i, "techStack", e.target.value)}
                placeholder="React, Node.js, Tailwind"
              />
            </div>

          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              className={`${inputStyle} min-h-[80px]`}
              value={p.description}
              onChange={e => update(i, "description", e.target.value)}
              placeholder="Describe what you built..."
            />
          </div>

        </div>
      ))}

      <button
        onClick={addProject}
        className="bg-white/40 backdrop-blur-lg 
        border border-white/40 
        px-4 py-2 
        rounded-lg 
        text-sm 
        hover:bg-white/60 
        transition"
      >
        + Add project
      </button>

    </div>
  );
}