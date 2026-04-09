export default function Education({ data, setData }) {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">College / University</label>
        <input className="input" value={data.education.college} onChange={e => update("college", e.target.value)} placeholder="IIT Delhi" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">Degree</label>
        <input className="input" value={data.education.degree} onChange={e => update("degree", e.target.value)} placeholder="B.Tech" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">Branch</label>
        <input className="input" value={data.education.branch} onChange={e => update("branch", e.target.value)} placeholder="Computer Science" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">Year</label>
        <input className="input" value={data.education.year} onChange={e => update("year", e.target.value)} placeholder="2022 - 2026" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">CGPA / Percentage</label>
        <input className="input" value={data.education.cgpa} onChange={e => update("cgpa", e.target.value)} placeholder="8.5 / 10" />
      </div>
    </div>
  );
}