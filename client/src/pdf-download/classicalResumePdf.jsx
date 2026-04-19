import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#111827',
    backgroundColor: '#ffffff',
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 0,
    paddingBottom: 14,
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
  },
  jobTitle: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 3,
  },
  contactColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: '38%',
  },
  contactText: {
    fontSize: 10,
    color: '#111827',
    marginBottom: 3,
  },
  link: {
    fontSize: 10,
    color: '#374151',
    textDecoration: 'none',
    marginBottom: 3,
  },

  // SECTION
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#111827',
    borderBottomWidth: 1.5,
    borderBottomColor: '#4B5563',
    paddingBottom: 2,
    marginBottom: 8,
    marginTop: 10,
  },

  // SUMMARY
  summaryText: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.6,
  },

  // SKILLS
  skillsText: {
    fontSize: 10,
    color: '#111827',
    lineHeight: 1.5,
  },

  // EXPERIENCE / PROJECTS
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#4B5563',
  },
  bullet: {
    fontSize: 10,
    color: '#1F2937',
    marginLeft: 10,
    marginBottom: 2,
    lineHeight: 1.5,
  },
  itemWrapper: {
    marginBottom: 8,
  },

  // EDUCATION
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eduLeft: {
    flexDirection: 'column',
  },
  eduRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const ClassicalPDF = ({ aboutMe, skills, education, experience, projects, personalInfo, isFresher, jobTitle }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View>
            <Text style={styles.name}>{personalInfo?.name || "Your Name"}</Text>
            <Text style={styles.jobTitle}>{jobTitle || "MERN Stack Developer | AI Integration"}</Text>
          </View>

          {/* RIGHT */}
          <View style={styles.contactColumn}>
            {personalInfo?.email && (
              <Link style={styles.link} src={`mailto:${personalInfo.email}`}>
                {personalInfo.email}
              </Link>
            )}
            {personalInfo?.phone && (
              <Text style={styles.contactText}>{personalInfo.phone}</Text>
            )}
            {personalInfo?.location && (
              <Text style={styles.contactText}>{personalInfo.location}</Text>
            )}
            {personalInfo?.linkedin && (
              <Link style={styles.link} src={
                personalInfo.linkedin.startsWith('http')
                  ? personalInfo.linkedin
                  : `https://${personalInfo.linkedin}`
              }>
                {personalInfo.linkedin}
              </Link>
            )}
            {personalInfo?.github && (
              <Link style={styles.link} src={
                personalInfo.github.startsWith('http')
                  ? personalInfo.github
                  : `https://${personalInfo.github}`
              }>
                {personalInfo.github}
              </Link>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {aboutMe?.[0]?.about && (
          <View style={{ marginBottom: 6 }}>
            <SectionTitle>Summary</SectionTitle>
            <Text style={styles.summaryText}>{aboutMe[0].about}</Text>
          </View>
        )}

        {/* SKILLS */}
        {skills?.length > 0 && (
          <View style={{ marginBottom: 6 }}>
            <SectionTitle>Skills</SectionTitle>
            <Text style={styles.skillsText}>{skills.join(' • ')}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {!isFresher && experience?.length > 0 && (
          <View style={{ marginBottom: 6 }}>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, i) => (
              <View key={i} style={styles.itemWrapper}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.role} — {exp.company}</Text>
                  <Text style={styles.itemSubtitle}>{exp.duration}</Text>
                </View>
                {exp.points?.map((point, j) => (
                  <Text key={j} style={styles.bullet}>• {point}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {projects?.length > 0 && (
          <View style={{ marginBottom: 6 }}>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj, i) => (
              <View key={i} style={styles.itemWrapper}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                  <Text style={styles.itemSubtitle}>{proj.techStack}</Text>
                </View>
                {proj.points?.map((point, j) => (
                  <Text key={j} style={styles.bullet}>• {point}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {education?.college && (
          <View style={{ marginBottom: 6 }}>
            <SectionTitle>Education</SectionTitle>
            <View style={styles.eduRow}>
              <View style={styles.eduLeft}>
                <Text style={styles.itemTitle}>{education.college}</Text>
                <Text style={styles.itemSubtitle}>
                  {education.degree} — {education.branch}
                </Text>
              </View>
              <View style={styles.eduRight}>
                <Text style={styles.itemSubtitle}>{education.year}</Text>
                {education.cgpa && (
                  <Text style={styles.itemSubtitle}>CGPA: {education.cgpa}</Text>
                )}
              </View>
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
};

export default ClassicalPDF;