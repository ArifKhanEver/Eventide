// app/components/EventListing.tsx  (or wherever this file lives)
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";

export default async function EventListing() {
  await connectDB();

  const events = await Event.find({ status: "upcoming" })
    .sort({ date: 1 })
    .limit(4)
    .lean();

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 relative">
      <div className="mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-dusk-400 block mb-2">
          Handpicked Quality
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Trending <span className="text-amber-400">Headliner Experiences</span>
        </h2>
      </div>

      {events.length === 0 ? (
        <p className="text-white/50 text-center">No upcoming events right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event._id.toString()}
              className="flex flex-col h-full bg-twilight-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group"
            >
              <div className="relative aspect-[16/11] w-full bg-twilight-800 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white font-semibold text-[10px] uppercase tracking-wider rounded-md">
                  {event.category}
                </div>
                {event.coverImage && (
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-twilight-950 via-transparent to-transparent opacity-60" />
              </div>

              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-amber-400 mb-3">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-lg font-bold text-white line-clamp-1 mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                  {event.title}
                </h3>

                <p className="text-xs text-white/50 line-clamp-2 flex-grow mb-6 leading-relaxed">
                  {event.shortDescription}
                </p>

                <div className="text-[11px] text-white/40 mb-5 flex items-center gap-1 font-medium">
                  <span>📍</span> <span className="truncate">{event.city}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-white/30 tracking-wider">
                      Passes From
                    </span>
                    <span className="text-xl font-black text-white">
                      {event.price === 0 ? "Free" : `৳${event.price}`}
                    </span>
                  </div>
                  <Link
                    href={`/events/${event._id.toString()}`}
                    className="text-xs font-bold bg-white text-twilight-950 px-4 py-2.5 rounded-xl hover:bg-amber-400 hover:text-twilight-950 transition-colors shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/events"
        className="flex items-center gap-1 justify-center text-sm font-medium text-dusk-400 hover:text-dusk-300 pt-8"
      >
        View all events <FiArrowRight />
      </Link>
    </section>
  );
}