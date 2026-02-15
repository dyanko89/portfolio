import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Danny Yanko",
  description: "Get in touch to discuss your project.",
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
