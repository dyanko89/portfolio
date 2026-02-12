import React from "react"
import { Document, Page, Text, View, Image, Font, StyleSheet } from "@react-pdf/renderer"
import path from "path"
import { personalInfo, experience, systems, skills } from "@/lib/cv-data"

// Register Ubuntu fonts
const fontsDir = path.join(process.cwd(), "public", "fonts")

Font.register({
  family: "Ubuntu",
  fonts: [
    { src: path.join(fontsDir, "Ubuntu-Light.ttf"), fontWeight: 300 },
    { src: path.join(fontsDir, "Ubuntu-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Ubuntu-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontsDir, "Ubuntu-Bold.ttf"), fontWeight: 700 },
  ],
})

Font.register({
  family: "UbuntuMono",
  fonts: [
    { src: path.join(fontsDir, "UbuntuMono-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "UbuntuMono-Bold.ttf"), fontWeight: 700 },
  ],
})

// Starforge design tokens
const t = {
  bg: "#0a0f12",
  surface: "#1a2329",
  text: "#e8edef",
  secondary: "#a8b5bd",
  muted: "#6b7a85",
  accent: "#ff5722",
  border: "#2a3942",
}

const s = StyleSheet.create({
  page: {
    backgroundColor: t.bg,
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 36,
    fontFamily: "Ubuntu",
    color: t.text,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  logo: {
    width: 28,
    height: 36,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    color: t.text,
    letterSpacing: 0.5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: 300,
    color: t.secondary,
  },
  contactInfo: {
    flexDirection: "row",
    gap: 14,
  },
  contactItem: {
    fontSize: 7.5,
    fontFamily: "UbuntuMono",
    color: t.muted,
  },
  // Accent divider
  divider: {
    height: 2,
    backgroundColor: t.accent,
    marginTop: 8,
    marginBottom: 14,
  },
  thinDivider: {
    height: 1,
    backgroundColor: t.border,
    marginTop: 12,
    marginBottom: 12,
  },
  // Section
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: t.text,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  // Experience — compact inline layout
  expRow: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  expRole: {
    fontSize: 10,
    fontWeight: 700,
    color: t.text,
  },
  expCompany: {
    fontSize: 10,
    fontWeight: 500,
    color: t.accent,
  },
  expPeriod: {
    fontSize: 7.5,
    fontFamily: "UbuntuMono",
    color: t.muted,
  },
  expDesc: {
    fontSize: 8.5,
    fontWeight: 300,
    color: t.secondary,
    lineHeight: 1.45,
  },
  // Systems — two-column
  sysGrid: {
    flexDirection: "row",
    gap: 14,
  },
  sysCol: {
    flex: 1,
  },
  sysRow: {
    marginBottom: 8,
  },
  sysName: {
    fontSize: 10,
    fontWeight: 700,
    color: t.text,
    marginBottom: 2,
  },
  sysDesc: {
    fontSize: 8,
    fontWeight: 300,
    color: t.secondary,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  techPill: {
    fontSize: 6.5,
    fontFamily: "UbuntuMono",
    color: t.muted,
    backgroundColor: t.surface,
    borderWidth: 1,
    borderColor: t.border,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  // Skills — two-column grid
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillCategory: {
    width: "48%",
    marginBottom: 4,
  },
  skillLabel: {
    fontSize: 7,
    fontWeight: 500,
    color: t.muted,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillPill: {
    fontSize: 7,
    fontFamily: "UbuntuMono",
    color: t.secondary,
    borderWidth: 1,
    borderColor: t.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: t.border,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    fontFamily: "UbuntuMono",
    color: t.muted,
  },
})

const logoPath = path.join(process.cwd(), "public", "assets", "djy89-solid.png")

export function CVDocument() {
  // Split systems into two columns
  const sysLeft = systems.slice(0, 2)
  const sysRight = systems.slice(2)

  return (
    <Document
      title={`${personalInfo.name} — CV`}
      author={personalInfo.name}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Image src={logoPath} style={s.logo} />
          <View style={s.headerText}>
            <Text style={s.name}>{personalInfo.name}</Text>
            <View style={s.titleRow}>
              <Text style={s.jobTitle}>{personalInfo.title}</Text>
              <View style={s.contactInfo}>
                <Text style={s.contactItem}>{personalInfo.email}</Text>
                <Text style={s.contactItem}>{personalInfo.website}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Accent divider */}
        <View style={s.divider} />

        {/* Work Experience */}
        <Text style={s.sectionTitle}>Work Experience</Text>
        {experience.map((item, i) => (
          <View key={i} style={s.expRow}>
            <View style={s.expHeader}>
              <Text style={s.expRole}>{item.role}</Text>
              <Text style={s.expCompany}>{"  —  "}{item.company}</Text>
            </View>
            <Text style={s.expPeriod}>{item.period}</Text>
            <Text style={s.expDesc}>{item.description}</Text>
          </View>
        ))}

        {/* Thin divider */}
        <View style={s.thinDivider} />

        {/* Systems I've Built — two columns */}
        <Text style={s.sectionTitle}>{"Systems I've Built"}</Text>
        <View style={s.sysGrid}>
          <View style={s.sysCol}>
            {sysLeft.map((item, i) => (
              <View key={i} style={s.sysRow}>
                <Text style={s.sysName}>{item.name}</Text>
                <Text style={s.sysDesc}>{item.description}</Text>
                <View style={s.techRow}>
                  {item.tech.map((tech) => (
                    <Text key={tech} style={s.techPill}>{tech}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View style={s.sysCol}>
            {sysRight.map((item, i) => (
              <View key={i} style={s.sysRow}>
                <Text style={s.sysName}>{item.name}</Text>
                <Text style={s.sysDesc}>{item.description}</Text>
                <View style={s.techRow}>
                  {item.tech.map((tech) => (
                    <Text key={tech} style={s.techPill}>{tech}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Thin divider */}
        <View style={s.thinDivider} />

        {/* Technical Skills — two-column grid */}
        <Text style={s.sectionTitle}>Technical Skills</Text>
        <View style={s.skillGrid}>
          {skills.map((group, i) => (
            <View key={i} style={s.skillCategory}>
              <Text style={s.skillLabel}>{group.category}</Text>
              <View style={s.skillRow}>
                {group.items.map((item) => (
                  <Text key={item} style={s.skillPill}>{item}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>{personalInfo.website}</Text>
          <Text style={s.footerText}>{personalInfo.email}</Text>
        </View>
      </Page>
    </Document>
  )
}
