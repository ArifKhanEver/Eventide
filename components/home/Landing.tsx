// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiSearch,
  FiPlusCircle,
  FiHelpCircle,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import Hero from "./Hero";

// Re-fetched on every request rather than cached statically, since event
// counts/upcoming events change as organizers add things — fine at this
// scale, and simpler than reasoning about ISR revalidation windows right now.
export const dynamic = "force-dynamic";

const CATEGORIES = [
  "Conference",
  "Concert",
  "Workshop",
  "Sports",
  "Networking",
  "Festival",
] as const;

export default async function LandingPage() {
  await connectDB();

  const [upcomingEvents, totalEvents, cityAgg, categoryAgg] = await Promise.all([
    Event.find({ status: "upcoming" }).sort({ date: 1 }).limit(4).lean(),
    Event.countDocuments(),
    Event.aggregate([{ $group: { _id: "$city" } }]),
    Event.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
  ]);

  const totalCities = cityAgg.length;
  const categoryCounts = Object.fromEntries(
    categoryAgg.map((c: { _id: string; count: number }) => [c._id, c.count])
  ) as Record<string, number>;

  return (
    <main className="bg-twilight-950 text-foreground">
      <Hero/>

      {/* 1. Upcoming Events */}
      <Section title="Upcoming Events" subtitle="Fresh on the platform right now">
        {upcomingEvents.length === 0 ? (
          <EmptyState
            message="No upcoming events yet — be the first to publish one."
            ctaHref="/events/add"
            ctaLabel="Add an Event"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((event) => (
              <Link
                key={event._id.toString()}
                href={`/events/${event._id.toString()}`}
                className="overflow-hidden rounded-2xl border border-twilight-800 bg-twilight-900 transition-transform hover:-translate-y-1"
              >
                <div className="relative h-36 w-full bg-twilight-800">
                  {event.coverImage && (
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-dusk-500/90 px-3 py-1 text-xs font-medium text-white">
                    {event.category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="mb-1 line-clamp-1 font-medium">{event.title}</p>
                  <p className="flex items-center gap-1 text-xs text-foreground/60">
                    <FiCalendar /> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-foreground/60">
                    <FiMapPin /> {event.city}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-medium text-dusk-400 hover:text-dusk-300"
          >
            View all events <FiArrowRight />
          </Link>
        </div>
      </Section>

      {/* 2. Browse by Category */}
      <Section title="Browse by Category" subtitle="Find exactly the kind of event you're after" alt>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/events?category=${cat}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-twilight-800 bg-twilight-900 p-5 text-center transition-colors hover:border-amber-400"
            >
              <span className="text-2xl font-bold text-amber-400">
                {categoryCounts[cat] ?? 0}
              </span>
              <span className="text-sm text-foreground/70">{cat}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. Platform Stats */}
      <Section title="Eventide at a Glance" subtitle="Real numbers from the platform">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard icon={<FiCalendar />} value={totalEvents} label="Events Published" />
          <StatCard icon={<FiMapPin />} value={totalCities} label="Cities Covered" />
          <StatCard icon={<FiTrendingUp />} value={CATEGORIES.length} label="Event Categories" />
        </div>
      </Section>

      {/* 4. How It Works */}
      <Section title="How It Works" subtitle="From browsing to publishing in three steps" alt>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StepCard
            icon={<FiSearch />}
            step="1"
            title="Discover"
            body="Search and filter events by category, city, date, or price to find what fits."
          />
          <StepCard
            icon={<FiPlusCircle />}
            step="2"
            title="Publish"
            body="Sign up, fill in your event details, and it's live for everyone to see."
          />
          <StepCard
            icon={<FiUsers />}
            step="3"
            title="Manage"
            body="Track and update your published events any time from your dashboard."
          />
        </div>
      </Section>

      {/* 5. Why Eventide */}
      <Section title="Why Organizers Choose Eventide" subtitle="Built to get out of your way">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FeatureRow
            icon={<FiZap />}
            title="Fast to publish"
            body="No approval queues — fill the form and your event is live immediately."
          />
          <FeatureRow
            icon={<FiShield />}
            title="You stay in control"
            body="Only you (or an admin) can edit or remove your events, enforced at the API level."
          />
        </div>
      </Section>

      {/* 6. FAQ */}
      <Section title="Frequently Asked Questions" subtitle="Quick answers before you dive in" alt>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <FaqItem
            q="Do I need an account to browse events?"
            a="No — event listings and details pages are public. You only need an account to publish or manage your own events."
          />
          <FaqItem
            q="Is there a fee to list an event?"
            a="No, publishing an event on Eventide is free. You set your own event's price field for attendees, if any."
          />
          <FaqItem
            q="Can I edit an event after publishing it?"
            a="Yes, from the Manage Events page you can update or delete any event you created."
          />
        </div>
      </Section>

      {/* 7. Call to Action */}
      <Section title="">
        <div className="rounded-3xl bg-gradient-to-br from-dusk-500 to-dusk-400 px-6 py-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            Have an event to share?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Publish it on Eventide and reach people actively looking for
            something to attend.
          </p>
          <Link
            href="/events/add"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3 font-semibold text-twilight-950 hover:bg-amber-500"
          >
            Add Your Event <FiArrowRight />
          </Link>
        </div>
      </Section>
    </main>
  );
}

function Section({
  title,
  subtitle,
  alt,
  children,
}: {
  title: string;
  subtitle?: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`px-4 py-14 sm:px-8 lg:px-16 ${alt ? "bg-twilight-900/40" : ""}`}>
      <div className="mx-auto max-w-7xl">
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            {subtitle && <p className="mt-1 text-foreground/60">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-twilight-800 bg-twilight-900 p-8 text-center">
      <div className="text-3xl text-amber-400">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-foreground/60">{label}</div>
    </div>
  );
}

function StepCard({
  icon,
  step,
  title,
  body,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative rounded-2xl border border-twilight-800 bg-twilight-900 p-6">
      <span className="absolute right-4 top-4 text-4xl font-bold text-twilight-800">{step}</span>
      <div className="mb-3 text-2xl text-amber-400">{icon}</div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-foreground/70">{body}</p>
    </div>
  );
}

function FeatureRow({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-twilight-800 bg-twilight-900 p-6">
      <div className="flex-shrink-0 text-2xl text-dusk-400">{icon}</div>
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-sm text-foreground/70">{body}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border border-twilight-800 bg-twilight-900 p-5">
      <div className="mb-1 flex items-center gap-2 font-medium">
        <FiHelpCircle className="text-amber-400" />
        {q}
      </div>
      <p className="pl-6 text-sm text-foreground/70">{a}</p>
    </div>
  );
}

function EmptyState({
  message,
  ctaHref,
  ctaLabel,
}: {
  message: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-twilight-800 p-10 text-center text-foreground/60">
      <p className="mb-4">{message}</p>
      <Link
        href={ctaHref}
        className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-twilight-950 hover:bg-amber-500"
      >
        <FiMail className="hidden" />
        {ctaLabel}
      </Link>
    </div>
  );
}