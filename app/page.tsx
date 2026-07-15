import Hero from "@/components/home/Hero";
import EventListing from "@/components/home/EventListing";
import Testimonials from "@/components/home/Testimonials";
import NewsletterFaq from "@/components/home/NewsLetterFaq";

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
  FiSearch,
  FiPlusCircle,
  FiHelpCircle,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import { FiMic, FiMusic, FiTool, FiActivity, FiStar } from "react-icons/fi";
import Review from "@/models/Review";
import StatsChart from "@/components/home/StatsChart";

export const dynamic = "force-dynamic";


const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Conference: <FiMic />,
  Concert: <FiMusic />,
  Workshop: <FiTool />,
  Sports: <FiActivity />,
  Networking: <FiUsers />,
  Festival: <FiStar />,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  Conference: "from-dusk-500/20 to-transparent",
  Concert: "from-amber-500/20 to-transparent",
  Workshop: "from-emerald-500/20 to-transparent",
  Sports: "from-blue-500/20 to-transparent",
  Networking: "from-dusk-400/20 to-transparent",
  Festival: "from-amber-400/20 to-transparent",
};

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

const [totalReviews, monthlyEvents, monthlyReviews] = await Promise.all([
  Review.countDocuments(),
  aggregateByMonth(Event),
  aggregateByMonth(Review),
]);

const monthlySeries = buildMonthlySeries(monthlyEvents, monthlyReviews);
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
      <Hero />
      <EventListing />

      {/* 2. Browse by Category */}
      <section className="relative mx-auto max-w-7xl px-4 py-4">
        <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-dusk-500/5 blur-[120px]" />

        <div className="relative mb-16 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-dusk-400">
              Curated Experiences
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Browse by <span className="text-amber-400">Category</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="group mt-4 flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-amber-400 md:mt-0"
          >
            Browse All Events
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/events?category=${cat}`}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-twilight-900 to-twilight-950/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-dusk-500/40 hover:shadow-2xl hover:shadow-dusk-500/5"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_GRADIENTS[cat]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-twilight-800 text-xl transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/30 group-hover:text-amber-400">
                  {CATEGORY_ICONS[cat]}
                </div>
                <h3 className="mb-1 text-sm font-bold tracking-tight text-white transition-colors group-hover:text-amber-400 sm:text-base">
                  {cat}
                </h3>
                <p className="text-xs font-medium tracking-wide text-white/40">
                  {categoryCounts[cat] ?? 0} {(categoryCounts[cat] ?? 0) === 1 ? "Event" : "Events"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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


        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Platform <span className="text-amber-400">Growth</span>
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Real activity from Eventide's own database — events published and
                reviews left by attendees, tracked month over month.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border border-twilight-800 bg-twilight-900 p-4">
                  <span className="block text-2xl font-bold text-white">{totalEvents}</span>
                  <span className="text-xs text-white/40">Total Events Hosted</span>
                </div>
                <div className="rounded-xl border border-twilight-800 bg-twilight-900 p-4">
                  <span className="block text-2xl font-bold text-white">{totalReviews}</span>
                  <span className="text-xs text-white/40">Reviews Collected</span>
                </div>
              </div>
            </div>

            <div className="h-72 rounded-xl border border-twilight-800 bg-twilight-900 p-6 lg:col-span-2">
              <StatsChart data={monthlySeries} />
            </div>
          </div>
        </section>

        <Testimonials />

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

        <NewsletterFaq />

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

// Groups documents by (year, month) of their createdAt field.
async function aggregateByMonth(Model: typeof Event | typeof Review) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  return Model.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);
}

function buildMonthlySeries(
  eventsByMonth: { _id: { year: number; month: number }; count: number }[],
  reviewsByMonth: { _id: { year: number; month: number }; count: number }[]
) {
  const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const series = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // Mongo's $month is 1-indexed

    const eventCount =
      eventsByMonth.find((e) => e._id.year === year && e._id.month === month)?.count ?? 0;
    const reviewCount =
      reviewsByMonth.find((r) => r._id.year === year && r._id.month === month)?.count ?? 0;

    series.push({ month: MONTH_NAMES[d.getMonth()], events: eventCount, reviews: reviewCount });
  }

  return series;
}
