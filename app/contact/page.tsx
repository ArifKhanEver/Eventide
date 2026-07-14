// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Input, TextArea, Button } from "@heroui/react";
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";

export default function ContactPage() {
  // No backend endpoint for this yet — it's a UI-only confirmation.
  // If you want submissions actually stored/emailed, that needs a small
  // app/api/contact/route.ts; say so and I'll add it.
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-twilight-950 px-4 py-16 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="mb-10 text-foreground/70">
          Questions, feedback, or partnership ideas — we'd like to hear from you.
        </p>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ContactInfo icon={<FiMail />} label="Email" value="hello@eventide.app" />
          <ContactInfo icon={<FiMapPin />} label="Location" value="Dhaka, Bangladesh" />
          <div className="flex items-center gap-4 rounded-xl border border-twilight-800 bg-twilight-900 p-4">
            <a href="https://github.com" className="text-2xl text-foreground/70 hover:text-amber-400">
              <FiGithub />
            </a>
            <a href="https://linkedin.com" className="text-2xl text-foreground/70 hover:text-amber-400">
              <FiLinkedin />
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-dusk-500/40 bg-dusk-500/10 p-6 text-center">
            <p className="font-medium">Thanks — your message has been noted.</p>
            <p className="mt-1 text-sm text-foreground/60">
              We'll get back to you as soon as we can.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex flex-col gap-4 rounded-2xl border border-twilight-800 bg-twilight-900 p-6"
          >
            <Input
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-twilight-800 bg-twilight-950 px-3 py-2 text-sm"
            />
            <Input
              required
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border border-twilight-800 bg-twilight-950 px-3 py-2 text-sm"
            />
            <TextArea
              required
              rows={5}
              placeholder="Your message"
              className="w-full rounded-lg border border-twilight-800 bg-twilight-950 px-3 py-2 text-sm"
            />
            <Button
              type="submit"
              className="rounded-lg bg-amber-400 py-3 font-semibold text-twilight-950 hover:bg-amber-500"
            >
              Send Message
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-twilight-800 bg-twilight-900 p-4">
      <div className="mb-1 flex items-center gap-2 text-amber-400">
        {icon}
        <span className="text-xs text-foreground/60">{label}</span>
      </div>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}