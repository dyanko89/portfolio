import Link from "next/link";

export default function AboutSection() {
  return (
    <div className="section">
      <div className="grid-container">
        <div className="grid">
          <div className="grid-cell span-6">
            <h2 className="text-heading-48">About Me</h2>
            <p className="text-copy-20" style={{ marginTop: "24px", marginBottom: "24px" }}>
              I&apos;m a full-stack developer with a passion for building innovative solutions that make a real impact.
            </p>
            <p className="text-copy-16" style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "32px" }}>
              With over a decade of experience in software development, I&apos;ve had the privilege of working on diverse projects that have shaped my expertise in creating robust, scalable applications. I&apos;m particularly passionate about leveraging cutting-edge technologies to solve complex business challenges, and I&apos;m always eager to take on new challenges.
            </p>
            <div className="grid" style={{ gap: "16px" }}>
              <div className="grid-cell span-6">
                <h3 className="text-heading-20" style={{ marginBottom: "16px" }}>Technical Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span className="badge">TypeScript</span>
                  <span className="badge">React</span>
                  <span className="badge">Node.js</span>
                  <span className="badge">Next.js</span>
                  <span className="badge">Python</span>
                  <span className="badge">AWS</span>
                  <span className="badge">Docker</span>
                  <span className="badge">PostgreSQL</span>
                </div>
              </div>
              <div className="grid-cell span-6">
                <h3 className="text-heading-20" style={{ marginBottom: "16px" }}>Industry Experience</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span className="badge">E-commerce</span>
                  <span className="badge">FinTech</span>
                  <span className="badge">EdTech</span>
                  <span className="badge">Healthcare</span>
                  <span className="badge">Enterprise</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-cell span-6">
            <div className="grid" style={{ gap: "24px" }}>
              <div className="grid-cell span-12">
                <div className="stat-card">
                  <div className="stat-card-content">
                    <div className="stat-card-value">10+</div>
                    <div className="stat-card-label">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="grid-cell span-6">
                <div className="stat-card">
                  <div className="stat-card-content">
                    <div className="stat-card-value">50+</div>
                    <div className="stat-card-label">Projects Completed</div>
                  </div>
                </div>
              </div>
              <div className="grid-cell span-6">
                <div className="stat-card">
                  <div className="stat-card-content">
                    <div className="stat-card-value">20+</div>
                    <div className="stat-card-label">Happy Clients</div>
                  </div>
                </div>
              </div>
              <div className="grid-cell span-12">
                <div className="stat-card">
                  <div className="stat-card-content">
                    <div className="stat-card-value">100%</div>
                    <div className="stat-card-label">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
