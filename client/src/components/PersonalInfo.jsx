export default function PersonalInfo({ data, setData }) {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
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

      <div className="grid md:grid-cols-2 gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            className={inputStyle}
            value={data.personalInfo.name}
            onChange={e => update("name", e.target.value)}
            placeholder="Himanshu Singh"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            className={inputStyle}
            value={data.personalInfo.email}
            onChange={e => update("email", e.target.value)}
            placeholder="you@email.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            className={inputStyle}
            value={data.personalInfo.phone}
            onChange={e => update("phone", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            className={inputStyle}
            value={data.personalInfo.location}
            onChange={e => update("location", e.target.value)}
            placeholder="Delhi, India"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            className={inputStyle}
            value={data.personalInfo.linkedin}
            onChange={e => update("linkedin", e.target.value)}
            placeholder="linkedin.com/in/..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            GitHub
          </label>
          <input
            className={inputStyle}
            value={data.personalInfo.github}
            onChange={e => update("github", e.target.value)}
            placeholder="github.com/..."
          />
        </div>

      </div>

    </div>
  );
}