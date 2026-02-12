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
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontFamily: "Ubuntu",
    color: t.text,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 14,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    color: t.text,
    letterSpacing: 0.5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 300,
    color: t.secondary,
  },
  contactInfo: {
    flexDirection: "row",
    gap: 16,
  },
  contactItem: {
    fontSize: 8,
    fontFamily: "UbuntuMono",
    color: t.muted,
  },
  // Accent divider
  divider: {
    height: 2,
    backgroundColor: t.accent,
    marginTop: 12,
    marginBottom: 20,
  },
  thinDivider: {
    height: 1,
    backgroundColor: t.border,
    marginTop: 16,
    marginBottom: 16,
  },
  // Section
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: t.text,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  // Experience
  expRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  expLeft: {
    width: 100,
    paddingRight: 10,
  },
  expPeriod: {
    fontSize: 8,
    fontFamily: "UbuntuMono",
    color: t.muted,
  },
  expRight: {
    flex: 1,
  },
  expRole: {
    fontSize: 11,
    fontWeight: 700,
    color: t.text,
    marginBottom: 1,
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 500,
    color: t.accent,
    marginBottom: 4,
  },
  expDesc: {
    fontSize: 9,
    fontWeight: 300,
    color: t.secondary,
    lineHeight: 1.5,
  },
  // Systems
  sysRow: {
    marginBottom: 14,
  },
  sysName: {
    fontSize: 11,
    fontWeight: 700,
    color: t.text,
    marginBottom: 3,
  },
  sysDesc: {
    fontSize: 9,
    fontWeight: 300,
    color: t.secondary,
    lineHeight: 1.5,
    marginBottom: 6,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  techPill: {
    fontSize: 7,
    fontFamily: "UbuntuMono",
    color: t.muted,
    backgroundColor: t.surface,
    borderWidth: 1,
    borderColor: t.border,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 2,
  },
  // Skills
  skillCategory: {
    marginBottom: 10,
  },
  skillLabel: {
    fontSize: 8,
    fontWeight: 500,
    color: t.muted,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillPill: {
    fontSize: 8,
    fontFamily: "UbuntuMono",
    color: t.secondary,
    borderWidth: 1,
    borderColor: t.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: t.border,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 7,
    fontFamily: "UbuntuMono",
    color: t.muted,
  },
  pageNumber: {
    fontSize: 7,
    fontFamily: "UbuntuMono",
    color: t.muted,
  },
})

const logoPath = path.join(process.cwd(), "public", "assets", "djy89-solid.png")

export function CVDocument() {
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
            <View style={s.expLeft}>
              <Text style={s.expPeriod}>{item.period}</Text>
            </View>
            <View style={s.expRight}>
              <Text style={s.expRole}>{item.role}</Text>
              <Text style={s.expCompany}>{item.company}</Text>
              <Text style={s.expDesc}>{item.description}</Text>
            </View>
          </View>
        ))}

        {/* Thin divider */}
        <View style={s.thinDivider} />

        {/* Systems I've Built */}
        <Text style={s.sectionTitle}>Systems I&apos;ve Built</Text>
        {systems.map((item, i) => (
          <View key={i} style={s.sysRow}>
            <Text style={s.sysName}>{item.name}</Text>
            <Text style={s.sysDesc}>{item.description}</Text>
            <View style={s.techRow}>
              {item.tech.map((t) => (
                <Text key={t} style={s.techPill}>{t}</Text>
              ))}
            </View>
          </View>
        ))}

        {/* Thin divider */}
        <View style={s.thinDivider} />

        {/* Technical Skills */}
        <Text style={s.sectionTitle}>Technical Skills</Text>
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

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>{personalInfo.website}</Text>
          <Text style={s.footerText}>{personalInfo.email}</Text>
          <Text
            style={s.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
