import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer';
import { PhoneIcon, MailIcon, LinkedinIcon, GithubIcon, MapPinIcon } from '../lib/Pdficons';

const styles = StyleSheet.create({
  page: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
  },

  // HEADER
  header: {
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Times-Bold',
    color: '#4A76A8',
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Italic',
    color: '#000000',
    marginTop: 3,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 6,
    gap:10,
  },
  contactText: {
    fontSize: 10,
    color: '#000000',
  },
  contactSep: {
    fontSize: 10,
    color: '#000000',
    marginHorizontal: 4,
  },
  link: {
    fontSize:  10,
    color: '#000000',
    textDecoration: 'none',
  },

  // SECTION
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#4A76A8',
    marginTop: 8,
    marginBottom: 2,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 5,
  },

  // SUMMARY
  summaryText: {
    fontSize: 11.5,
    color: '#000000',
    lineHeight: 1.4,
    textAlign: 'justify',
  },

  // SKILLS
  skillsText: {
    fontSize: 11.5,
    color: '#000000',
    lineHeight: 1.4,
  },

  // EXPERIENCE / PROJECTS
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 12.5,
    fontFamily: 'Times-Bold',
    color: '#000000',
  },
  itemSubtitle: {
    fontSize: 11.5,
    fontFamily: 'Times-Italic',
    color: '#000000',
  },
  bullet: {
    fontSize: 11.5,
    color: '#000000',
    marginLeft: 10,
    marginBottom: 1.5,
    lineHeight: 1.4,
  },
  itemWrapper: {
    marginBottom: 6,
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
  <View>
    <Text style={styles.sectionTitle}>{children}</Text>
    <View style={styles.sectionDivider} />
  </View>
);

const ATSResumePDF = ({ aboutMe, skills, education, experience, projects, personalInfo, isFresher, jobTitle }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.name || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{jobTitle || "MERN Stack Developer | AI Integration"}</Text>

          <View style={styles.contactRow}>
            {personalInfo?.phone && (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <PhoneIcon size={10} color="#000000" />
                  <Text style={styles.contactText}>+91 {personalInfo.phone}</Text>
                </View>
              </>
            )}
            {personalInfo?.email && (
              <>
                {/* <Text style={styles.contactSep}>|</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <MailIcon size={10} color="#000000" />
                  <Link style={styles.link} src={`mailto:${personalInfo.email}`}>
                    {personalInfo.email}
                  </Link>
                </View>
              </>
            )}  
            {personalInfo?.linkedin && (
              <>
                {/* <Text style={styles.contactSep}>|</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <LinkedinIcon size={10} color="#000000" />
                  <Link style={styles.link} src={
                    personalInfo.linkedin.startsWith('http')
                      ? personalInfo.linkedin
                      : `https://${personalInfo.linkedin}`
                  }>
                  LinkedIn
                </Link>
                </View>
              </>
            )}
            {personalInfo?.github && (
              <>
                {/* <Text style={styles.contactSep}>|</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <GithubIcon size={10} color="#000000" />
                <Link style={styles.link} src={
                  personalInfo.github.startsWith('http')
                    ? personalInfo.github
                    : `https://${personalInfo.github}`
                }>
                  GitHub
                </Link>
                </View>
              </>
            )}
            {personalInfo?.location && (
              <>
                {/* <Text style={styles.contactSep}>|</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <MapPinIcon size={10} color="#000000" />
                  <Text style={styles.contactText}>{personalInfo.location}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {aboutMe?.[0]?.about && (
          <View style={{ marginBottom: 2 }}>
            <SectionTitle>Professional Summary</SectionTitle>
            <Text style={styles.summaryText}>{aboutMe[0].about}</Text>
          </View>
        )}

        {/* SKILLS */}
        {skills && Object.keys(skills).length > 0 && (
          <View style={{ marginBottom: 2 }}>
            <SectionTitle>Skills</SectionTitle>
            {Object.entries(skills)
              .filter(([, list]) => list.length > 0)
              .map(([category, list]) => (
                <View key={category} style={{ flexDirection: 'row', marginBottom: 0.5 }}>
                  <Text style={[styles.skillsText, { fontFamily: 'Times-Bold', width: 150, flexShrink: 0 }]}>
                    {category} :
                  </Text>
                  <Text style={[styles.skillsText, { flex: 1, paddingLeft: 8 }]}>
                    {list.join(', ')}
                  </Text>
                </View>
              ))}
          </View>
        )}

        {/* PROJECTS */}
        {projects?.length > 0 && (
          <View style={{ marginBottom: 2 }}>
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

        {/* EXPERIENCE */}
        {!isFresher && experience?.length > 0 && (
          <View style={{ marginBottom: 2 }}>
            <SectionTitle>Work Experience</SectionTitle>
            {experience.map((exp, i) => (
              <View key={i} style={styles.itemWrapper}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.itemSubtitle}>{exp.duration}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                {exp.points?.map((point, j) => (
                  <Text key={j} style={styles.bullet}>• {point}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {education?.college && (
          <View style={{ marginBottom: 2 }}>
            <SectionTitle>Education</SectionTitle>
            <View style={styles.eduRow}>
              <View style={styles.eduLeft}>
                <Text style={styles.itemTitle}>{education.college}</Text>
                <Text style={styles.itemSubtitle}>
                  {education.degree}{education.branch ? ` - ${education.branch}` : ''}
                </Text>
              </View>
              <View style={styles.eduRight}>
                <Text style={styles.itemSubtitle}>{education.year}</Text>
                {education.cgpa && (
                  <Text style={styles.itemSubtitle}>CGPA : {education.cgpa}</Text>
                )}
              </View>
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
};

export default ATSResumePDF;