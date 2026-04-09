export default function PersonalInfo({ data, setData }) {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">Full name</label>
          <input className="input" value={data.personalInfo.name} onChange={e => update("name", e.target.value)} placeholder="Himanshu Singh" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
          <input className="input" value={data.personalInfo.email} onChange={e => update("email", e.target.value)} placeholder="you@email.com" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">Phone</label>
          <input className="input" value={data.personalInfo.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">Location</label>
          <input className="input" value={data.personalInfo.location} onChange={e => update("location", e.target.value)} placeholder="Delhi, India" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</label>
          <input className="input" value={data.personalInfo.linkedin} onChange={e => update("linkedin", e.target.value)} placeholder="linkedin.com/in/..." />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">GitHub</label>
          <input className="input" value={data.personalInfo.github} onChange={e => update("github", e.target.value)} placeholder="github.com/..." />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 dark:text-gray-400">About me</label>
        <textarea className="input min-h-[80px]" value={data.aboutMe} onChange={e => setData(prev => ({ ...prev, aboutMe: e.target.value }))} placeholder="Brief intro about yourself..." />
      </div>
    </div>
  );
}