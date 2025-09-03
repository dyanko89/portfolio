// components/navigation.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on a link
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  return (
    <>
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="logo" onClick={closeMobileMenu}>
            <Image 
              src="/assets/djy89.svg"
              alt="Dyanko89 Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="nav-links desktop-nav">
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/cv">CV</Link></li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Clickable area to close menu */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
      />

      {/* Mobile Navigation Menu */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
      >
        {/* Close button inside the menu */}
        <div className="mobile-menu-header">
          <button 
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <span className="close-icon">×</span>
          </button>
        </div>
        
        <ul className="mobile-nav-links">
          <li>
            <Link href="/#about" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" onClick={closeMobileMenu}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={closeMobileMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={closeMobileMenu}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/cv" onClick={closeMobileMenu}>
              CV
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
