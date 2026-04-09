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
      experience: [...prev.experience, { company: "", role: "", duration: "", description: "" }]
    }));
  };

  const removeExp = (i) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="fresher"
          checked={data.isFresher}
          onChange={e => setData(prev => ({ ...prev, isFresher: e.target.checked }))}
        />
        <label htmlFor="fresher" className="text-sm text-gray-600 dark:text-gray-300">I am a fresher (no experience)</label>
      </div>

      {!data.isFresher && (
        <>
          {data.experience.map((exp, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience {i + 1}</span>
                {data.experience.length > 1 && (
                  <button onClick={() => removeExp(i)} className="text-xs text-red-500">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-500 dark:text-gray-400">Company</label>
                  <input className="input" value={exp.company} onChange={e => update(i, "company", e.target.value)} placeholder="Google" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-500 dark:text-gray-400">Role</label>
                  <input className="input" value={exp.role} onChange={e => update(i, "role", e.target.value)} placeholder="Frontend Developer" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-500 dark:text-gray-400">Duration</label>
                  <input className="input" value={exp.duration} onChange={e => update(i, "duration", e.target.value)} placeholder="Jan 2023 - Dec 2023" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500 dark:text-gray-400">What you did</label>
                <textarea className="input min-h-[70px]" value={exp.description} onChange={e => update(i, "description", e.target.value)} placeholder="Describe your work..." />
              </div>
            </div>
          ))}
          <button onClick={addExp} className="text-sm border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            + Add experience
          </button>
        </>
      )}
    </div>
  );
}