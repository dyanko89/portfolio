import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="section hero">
      <div className="grid-container">
        <div className="grid">
          <div className="grid-cell span-8">
            <h1 className="text-heading-64">
              Hi, I&apos;m Danny Yanko
            </h1>
            <p className="text-copy-20" style={{ marginTop: "24px", marginBottom: "32px" }}>
              A full-stack developer specializing in building exceptional digital experiences. Currently focused on building accessible, human-centered products.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link href="/projects" className="button">View Projects</Link>
              <Link href="/contact" className="button button-outline">Get in Touch</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
