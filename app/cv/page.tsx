// app/cv/page.tsx
export default function CVPage() {
  return (
    <div className="section">
      <div className="grid-container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="text-heading-48">Curriculum Vitae</h1>
          <p className="text-copy-18" style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '16px auto 0' }}>
            A summary of my professional experience and technical skills.
          </p>
        </div>
        <div className="grid">
          <div className="grid-cell span-8" style={{gridColumnStart: 3}}>
            <h2 className="text-heading-32" style={{ marginBottom: '32px' }}>Work Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2022 – Present</div>
                <div className="timeline-title">Systems Architect & AI Consultant</div>
                <div className="timeline-content">Designed and deployed AI automation pipelines, built full-stack applications, and provided strategic consulting for startups and established businesses.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2018 – 2022</div>
                <div className="timeline-title">Digital Marketing & Web Development Lead</div>
                <div className="timeline-content">Led strategy and execution for digital campaigns, including building conversion-focused websites, funnels, and analytics dashboards.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2015 – 2018</div>
                <div className="timeline-title">Technical Project Manager</div>
                <div className="timeline-content">Managed cross-functional teams, coordinated software development projects, and implemented process improvements that increased delivery efficiency by 40%.</div>
              </div>
            </div>
            
            <h2 className="text-heading-32" style={{ marginBottom: '32px', marginTop: '48px' }}>Education & Certifications</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2023</div>
                <div className="timeline-title">AI & Machine Learning Specialization</div>
                <div className="timeline-content">Advanced coursework in prompt engineering, model fine-tuning, and AI system architecture.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2014</div>
                <div className="timeline-title">Bachelor of Computer Science</div>
                <div className="timeline-content">University of Calgary - Focus on software engineering and systems design.</div>
              </div>
            </div>
            
            <div style={{textAlign: 'center', marginTop: '48px'}}>
               <a href="/danny-yanko-cv.pdf" download className="btn btn-primary">Download Full CV (PDF)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
