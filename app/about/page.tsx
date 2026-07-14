// app/about/page.tsx
import { FiTarget, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-twilight-950 px-4 py-16 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">About Eventide</h1>
        <p className="mb-10 text-lg text-foreground/70">
          Eventide is a platform built to make discovering and hosting events in
          Bangladesh simple — from tech conferences and concerts to workshops
          and community meetups.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <AboutCard
            icon={<FiTarget />}
            title="Our Mission"
            body="Give organizers a fast, no-friction way to publish events, and give attendees a single place to find what's happening near them."
          />
          <AboutCard
            icon={<FiUsers />}
            title="Who It's For"
            body="Community organizers, university clubs, and small businesses running conferences, workshops, concerts, and meetups."
          />
          <AboutCard
            icon={<FiTrendingUp />}
            title="What's Next"
            body="We're building toward ticketing, organizer analytics, and richer search so events reach the right audience faster."
          />
        </div>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">How it started</h2>
          <p className="text-foreground/70">
            Eventide began as a course project exploring what a modern,
            production-style event platform looks like end-to-end — from
            authentication and role-based permissions to a fully searchable
            event catalog. The goal was to build every piece with the same
            care a real product team would: clean data models, secure APIs,
            and a UI that stays consistent whether you're browsing on a phone
            or a desktop.
          </p>
        </section>
      </div>
    </main>
  );
}

function AboutCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-twilight-800 bg-twilight-900 p-5">
      <div className="mb-3 text-2xl text-amber-400">{icon}</div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-foreground/70">{body}</p>
    </div>
  );
}