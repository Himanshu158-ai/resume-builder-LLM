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
      experience: [
        ...prev.experience,
        { company: "", role: "", duration: "", description: "" }
      ]
    }));
  };

  const removeExp = (i) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== i)
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

      {/* fresher checkbox */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          className="accent-blue-600"
          checked={data.isFresher}
          onChange={e =>
            setData(prev => ({ ...prev, isFresher: e.target.checked }))
          }
        />
        I am a fresher (no experience)
      </label>

      {!data.isFresher && (
        <>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="bg-white/40 backdrop-blur-xl 
              border border-white/40 
              rounded-xl p-5 space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Experience {i + 1}
                </span>

                {data.experience.length > 1 && (
                  <button
                    onClick={() => removeExp(i)}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-3">

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    className={inputStyle}
                    value={exp.company}
                    onChange={e => update(i, "company", e.target.value)}
                    placeholder="Google"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    className={inputStyle}
                    value={exp.role}
                    onChange={e => update(i, "role", e.target.value)}
                    placeholder="Frontend Developer"
                  />
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    className={inputStyle}
                    value={exp.duration}
                    onChange={e => update(i, "duration", e.target.value)}
                    placeholder="Jan 2023 - Dec 2023"
                  />
                </div>

              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  What you did
                </label>
                <textarea
                  className={`${inputStyle} min-h-[80px]`}
                  value={exp.description}
                  onChange={e => update(i, "description", e.target.value)}
                  placeholder="Describe your work..."
                />
              </div>
            </div>
          ))}

          {/* add button */}
          <button
            onClick={addExp}
            className="bg-white/40 backdrop-blur-lg 
            border border-white/40 
            px-4 py-2 
            rounded-lg 
            text-sm 
            hover:bg-white/60 
            transition"
          >
            + Add experience
          </button>
        </>
      )}
    </div>
  );
}
