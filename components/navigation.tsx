// components/navigation.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="nav">
      <div className="nav-content">
        <Link href="/" className="logo">
          <Image 
            src="/assets/djy89.svg"
            alt="Dyanko89 Logo"
            width={50}
            height={50}
            priority
          />
        </Link>
        <ul className="nav-links">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/cv">CV</Link></li>
        </ul>
        <button 
          className="mobile-menu-btn" 
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            fontSize: '1.2rem', 
            cursor: 'pointer' 
          }}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
