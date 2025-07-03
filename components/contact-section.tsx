import Image from "next/image";

export default function ContactSection() {
  return (
    <div className="section">
      <div className="grid-container">
        <div className="grid">
          <div className="grid-cell span-6">
            <h2 className="text-heading-48">Let&apos;s Connect</h2>
            <p className="text-copy-16" style={{ color: "rgba(255, 255, 255, 0.7)", marginTop: "24px", marginBottom: "32px" }}>
              Whether you&apos;re looking to build something amazing, need technical expertise, or just want to chat about technology and innovation, I&apos;d love to hear from you.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <Image src="/assets/globe.png" alt="Location" width={24} height={24} />
                <span>Washington, D.C.</span>
              </div>
              <div className="contact-method">
                <Image src="/assets/phone.png" alt="Phone" width={24} height={24} />
                <span>Available for remote work</span>
              </div>
              <div className="contact-method">
                <Image src="/assets/send.png" alt="Email" width={24} height={24} />
                <span>dyanko89@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="grid-cell span-6">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} required></textarea>
              </div>
              <button type="submit" className="button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
