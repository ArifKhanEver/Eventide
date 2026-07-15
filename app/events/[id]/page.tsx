import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import Event from "@/models/Event";
import Review from "@/models/Review";
import EventGallery from "./EventGallery";
import { FiCalendar, FiMapPin, FiUsers, FiTag, FiClock, FiStar } from "react-icons/fi";
import ReviewForm from "../../api/events/[id]/ReviewForm";

type PageProps = { params: Promise<{ id: string }> };

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;
  await connectDB();

  const [event, session] = await Promise.all([
    Event.findById(id).lean(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!event) notFound();

  const [reviews, relatedEvents] = await Promise.all([
    Review.find({ eventId: event._id }).sort({ createdAt: -1 }).lean(),
    Event.find({ category: event.category, _id: { $ne: event._id } })
      .limit(4)
      .lean(),
  ]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  const images = [event.coverImage, ...(event.gallery ?? [])].filter(Boolean) as string[];

  const isOrganizer = session?.user.id === event.organizerId.toString();
  const hasReviewed = session
    ? reviews.some((r) => r.userId === session.user.id)
    : false;

  return (
    <main className="min-h-screen bg-twilight-950 px-4 py-10 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/events" className="mb-6 inline-block text-sm text-dusk-400 hover:text-dusk-300">
          ← Back to Explore
        </Link>

        <EventGallery images={images} title={event.title} />

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-dusk-500/90 px-3 py-1 text-xs font-medium text-white">
              {event.category}
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl">{event.title}</h1>
            {avgRating !== null && (
              <div className="mt-2 flex items-center gap-1 text-sm text-amber-400">
                <FiStar className="fill-amber-400" />
                {avgRating.toFixed(1)} · {reviews.length} review{reviews.length !== 1 && "s"}
              </div>
            )}
          </div>
          <div className="rounded-xl bg-twilight-900 px-5 py-3 text-right">
            <p className="text-2xl font-bold text-amber-400">
              {event.price === 0 ? "Free" : `৳${event.price}`}
            </p>
            <p className="text-xs text-foreground/60">
              {event.seatsLeft} of {event.capacity} seats left
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-2 text-xl font-semibold">Overview</h2>
          <p className="whitespace-pre-line text-foreground/80">{event.fullDescription}</p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-twilight-900 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem
            icon={<FiCalendar />}
            label="Date"
            value={new Date(event.date).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          <InfoItem icon={<FiClock />} label="Time" value={event.time} />
          <InfoItem icon={<FiMapPin />} label="Venue" value={`${event.venue}, ${event.city}`} />
          <InfoItem icon={<FiUsers />} label="Capacity" value={`${event.capacity} attendees`} />
          <InfoItem icon={<FiTag />} label="Status" value={event.status} />
        </section>

        {/* Reviews */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">
            Reviews {reviews.length > 0 && `(${reviews.length})`}
          </h2>

          {!session ? (
            <p className="mb-6 rounded-xl border border-twilight-800 bg-twilight-900 p-4 text-sm text-foreground/60">
              <Link href={`/login?redirect=/events/${id}`} className="text-dusk-400 hover:text-dusk-300">
                Log in
              </Link>{" "}
              to leave a review.
            </p>
          ) : isOrganizer ? (
            <p className="mb-6 rounded-xl border border-twilight-800 bg-twilight-900 p-4 text-sm text-foreground/60">
              You can't review your own event.
            </p>
          ) : hasReviewed ? (
            <p className="mb-6 rounded-xl border border-twilight-800 bg-twilight-900 p-4 text-sm text-foreground/60">
              You've already reviewed this event.
            </p>
          ) : (
            <ReviewForm eventId={id} />
          )}

          {reviews.length === 0 ? (
            <p className="text-foreground/60">
              No reviews yet — be the first to review this event.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review._id.toString()}
                  className="rounded-xl border border-twilight-800 bg-twilight-900 p-4"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{review.userName ?? "Anonymous"}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} className={i < review.rating ? "fill-amber-400" : "opacity-30"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {relatedEvents.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">More {event.category} events</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedEvents.map((related) => (
                <Link
                  key={related._id.toString()}
                  href={`/events/${related._id.toString()}`}
                  className="overflow-hidden rounded-xl border border-twilight-800 bg-twilight-900 transition-transform hover:-translate-y-1"
                >
                  <div className="relative h-32 w-full bg-twilight-800">
                    {related.coverImage && (
                      <Image
                        src={related.coverImage}
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-1 text-sm font-medium">{related.title}</p>
                    <p className="text-xs text-foreground/60">{related.city}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-dusk-400">{icon}</span>
      <div>
        <p className="text-xs text-foreground/50">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}