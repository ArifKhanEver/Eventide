import Link from "next/link";
import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

// 1. TypeScript Interface: Changed icon type from string to React.ReactNode
interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

export default function Footer() {
  const quickLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "Explore Events", href: "/explore" },
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  // 2. Passing actual inline SVG elements instead of strings
  const socialLinks: SocialLink[] = [
    {
      platform: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      platform: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-twilight-950 border-t border-twilight-800 text-foreground/80 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-amber-400">Eventide</h3>
          <p className="text-sm text-white/60">
            The ultimate full-stack hub to discover, host, and manage premium tech conferences, concerts, and workshops globally.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-amber-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-semibold text-white">Contact & Follow Us</h4>
          <p className="text-sm text-white/60">Email: support@eventide.com</p>
          <div className="flex gap-4 pt-2">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-twilight-900 border border-twilight-800 rounded-lg text-white/60 hover:text-amber-400 hover:border-amber-400/40 transition-all"
                aria-label={social.platform}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 text-center text-xs text-white/40 border-t border-twilight-900 mt-8 pt-6">
        &copy; {new Date().getFullYear()} Eventide. All rights reserved.
      </div>
    </footer>
  );
}