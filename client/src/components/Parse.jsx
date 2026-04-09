const parseAIContent = (content) => {
  if (!content) return { summary: "", experience: [], projects: [] };

  const summaryMatch = content.match(
    /Professional Summary([\s\S]*?)(?=Experience|$)/i
  );
  const experienceMatch = content.match(
    /Experience([\s\S]*?)(?=Projects|$)/i
  );
  const projectsMatch = content.match(
    /Projects([\s\S]*?)$/i
  );

  const summary = summaryMatch?.[1]?.trim() || "";
  const experience = experienceMatch?.[1]?.trim() || "";
  const project = projectsMatch?.[1]?.trim() || "";


  // const parseSection = (text, keys) => {
  //   if (!text) return [];
  //   return text.split(/\n{2,}/).map(block => {
  //     block = block.trim();
  //     if (!block) return null;
  //     const lines = block.split('\n');
  //     const titleParts = lines[0].split('|').map(s => s.trim());
      
  //     const obj = {};
  //     keys.forEach((key, idx) => {
  //       obj[key] = titleParts[idx] || "";
  //     });
  //     obj.description = lines.slice(1).join('\n').trim();
  //     return obj;
  //   }).filter(Boolean);
  // };

  // const parseSection = (text) => {
  //   if (!text) return [];
  //   return text.split(/\n{2,}/).map(block => {
  //     block = block.trim();
  //     if (!block) return null;
  //     const lines = block.split('\n');
  //     const titleParts = lines[0].split('|').map(s => s.trim());
      
  //     const obj = {};
  //     obj.role = titleParts[0] || "";
  //     obj.company = titleParts[1] || "";
  //     obj.duration = titleParts[2] || "";
  //     obj.description = lines.slice(1).join('\n').trim();
  //     return obj;
  //   }).filter(Boolean);
  // };

  // const experience = parseSection(experienceMatch?.[1]?.trim());
  // const projects = parseSection(projectsMatch?.[1]?.trim());

  return { summary, experience, projects };
};

export default parseAIContent;
