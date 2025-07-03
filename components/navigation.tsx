import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <Image
            src="/assets/djy89-outline.png"
            alt="Danny Yanko"
            width={40}
            height={40}
            priority
          />
        </Link>
        <div className="nav-links">
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/services">Services</Link>
          <Link href="/cv">CV</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
