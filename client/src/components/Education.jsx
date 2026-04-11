export default function Education({ data, setData }) {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
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
    <div className="grid md:grid-cols-2 gap-4">

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          College / University
        </label>
        <input
          className={inputStyle}
          value={data.education.college}
          onChange={e => update("college", e.target.value)}
          placeholder="IIT Delhi"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Degree
        </label>
        <input
          className={inputStyle}
          value={data.education.degree}
          onChange={e => update("degree", e.target.value)}
          placeholder="B.Tech"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Branch
        </label>
        <input
          className={inputStyle}
          value={data.education.branch}
          onChange={e => update("branch", e.target.value)}
          placeholder="Computer Science"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          className={inputStyle}
          value={data.education.year}
          onChange={e => update("year", e.target.value)}
          placeholder="2022 - 2026"
        />
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-sm font-medium text-gray-700">
          CGPA / Percentage
        </label>
        <input
          className={inputStyle}
          value={data.education.cgpa}
          onChange={e => update("cgpa", e.target.value)}
          placeholder="8.5 / 10"
        />
      </div>

    </div>
  );
}