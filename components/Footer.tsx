// components/Footer.tsx
import Link from "next/link";
import { FiCalendar, FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-twilight-800 bg-twilight-950 px-4 py-12 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-lg font-bold">
            <FiCalendar className="text-amber-400" />
            Eventide
          </div>
          <p className="text-sm text-foreground/60">
            Discover and host events across Bangladesh — conferences, concerts,
            workshops, and more.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground/80">Explore</h4>
          <ul className="flex flex-col gap-2 text-sm text-foreground/60">
            <li><Link href="/events" className="hover:text-amber-400">Browse Events</Link></li>
            <li><Link href="/events/add" className="hover:text-amber-400">Host an Event</Link></li>
            <li><Link href="/about" className="hover:text-amber-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground/80">Account</h4>
          <ul className="flex flex-col gap-2 text-sm text-foreground/60">
            <li><Link href="/login" className="hover:text-amber-400">Log In</Link></li>
            <li><Link href="/register" className="hover:text-amber-400">Sign Up</Link></li>
            <li><Link href="/events/manage" className="hover:text-amber-400">Manage Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground/80">Get in Touch</h4>
          <ul className="flex flex-col gap-3 text-sm text-foreground/60">
            <li className="flex items-center gap-2">
              <FiMail /> hello@eventide.app
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin /> Dhaka, Bangladesh
            </li>
          </ul>
          <div className="mt-4 flex gap-4 text-xl">
            <a href="https://github.com" className="text-foreground/60 hover:text-amber-400">
              <FiGithub />
            </a>
            <a href="https://linkedin.com" className="text-foreground/60 hover:text-amber-400">
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-twilight-800 pt-6 text-center text-xs text-foreground/40">
        © {new Date().getFullYear()} Eventide. Built for SCIC-13 Assignment 3.
      </div>
    </footer>
  );
}