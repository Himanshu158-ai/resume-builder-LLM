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
      projects: [...prev.projects, { name: "", techStack: "", description: "" }]
    }));
  };

  const removeProject = (i) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter((_, idx) => idx !== i) }));
  };

  return (
    <div className="space-y-4">
      {data.projects.map((p, i) => (
        <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Project {i + 1}</span>
            {data.projects.length > 1 && (
              <button onClick={() => removeProject(i)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 dark:text-gray-400">Project name</label>
              <input className="input" value={p.name} onChange={e => update(i, "name", e.target.value)} placeholder="Movie App" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 dark:text-gray-400">Tech stack</label>
              <input className="input" value={p.techStack} onChange={e => update(i, "techStack", e.target.value)} placeholder="React, Node.js" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 dark:text-gray-400">Description</label>
            <textarea className="input min-h-[70px]" value={p.description} onChange={e => update(i, "description", e.target.value)} placeholder="What you built..." />
          </div>
        </div>
      ))}
      <button onClick={addProject} className="text-sm border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
        + Add project
      </button>
    </div>
  );
}