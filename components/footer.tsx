// components/footer.tsx
export default function Footer() {
  return (
    <footer className="footer">
      {
        <div className="grid-container">
      <div className="footer-stats">
        <div className="footer-stat">
          <span className="footer-stat-number">10+</span>
          <span className="footer-stat-label">Years Experience</span>
        </div>
        <div className="footer-stat">
          <span className="footer-stat-number">50+</span>
          <span className="footer-stat-label">Projects Delivered</span>
        </div>
        <div className="footer-stat">
          <span className="footer-stat-number">95%</span>
          <span className="footer-stat-label">Client Satisfaction</span>
        </div>
        <div className="footer-stat">
          <span className="footer-stat-number">24/7</span>
          <span className="footer-stat-label">Always Building</span>
        </div>
      </div>
      <p className="text-copy-14">
        <em>From Chaos to Clarity</em><br />
        © 2025 Danny Yanko<br />
      </p>
    </div>
      }
    </footer>
  );
}