// components/contact-section.tsx
export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="grid-container">
        <div className="contact-section fade-in-on-scroll">
          <h2 className="text-heading-32" style={{ marginBottom: '24px' }}>Let&apos;s Work Together</h2>
          <p className="text-copy-18" style={{ maxWidth: '600px', margin: '0 auto 16px', color: 'var(--foreground)' }}>
            <strong>Got a bottleneck? A big idea? Need someone who can handle the technical, strategic, and creative all at once?</strong>
          </p>
          <p className="text-copy-16" style={{ maxWidth: '500px', margin: '0 auto 48px', color: 'rgba(255, 255, 255, 0.6)' }}>
            I partner with founders, teams, and organizations who want to work smarter, automate faster, and deliver better outcomes. If you&apos;re ready to turn complexity into clarity and build what others only brainstorm—I&apos;m your next call.
          </p>
          <div className="cta-buttons">
            <a href="mailto:danny@dyanko89.ca" className="btn btn-primary">Start a Project</a>
            <a href="https://www.linkedin.com/in/danny-yanko-10300124/" className="btn btn-secondary">Connect on LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
