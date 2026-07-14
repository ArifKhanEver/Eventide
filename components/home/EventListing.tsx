import Link from "next/link";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  date: string;
  location: string;
  rating: number;
  tag: string;
}

export default function EventListing() {
  const featuredEvents: EventCardProps[] = [
    {
      id: "ev-1",
      title: "NextGen AI & Data Summit",
      description: "Architecting the future of intelligence with top industry engineering leaders.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
      price: 149,
      date: "OCT 14, 2026",
      location: "San Francisco, CA",
      rating: 4.9,
      tag: "Conference",
    },
    {
      id: "ev-2",
      title: "Cyberpunk Cyber Symphonic",
      description: "An immersive sensory audio-visual journey blending analog synthesizers and modular lasers.",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
      price: 85,
      date: "NOV 02, 2026",
      location: "Austin, TX",
      rating: 4.8,
      tag: "Concert",
    },
    {
      id: "ev-3",
      title: "Advanced System Design Grid",
      description: "Mastering zero-latency infrastructures, data shards, and enterprise scaling logic.",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
      price: 59,
      date: "DEC 05, 2026",
      location: "Remote / Global",
      rating: 4.7,
      tag: "Workshop",
    },
    {
      id: "ev-4",
      title: "Metropolitan Indie Cinema",
      description: "Showcasing bold underground narratives from award-winning indie script directors.",
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
      price: 40,
      date: "JAN 20, 2027",
      location: "New York, NY",
      rating: 4.6,
      tag: "Festival",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 relative">
      <div className="mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-dusk-400 block mb-2">Handpicked Quality</span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Trending <span className="text-amber-400">Headliner Experiences</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredEvents.map((event) => (
          <div
            key={event.id}
            className="flex flex-col h-full bg-twilight-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group"
          >
            {/* Image Wrap */}
            <div className="relative aspect-[16/11] w-full bg-twilight-800 overflow-hidden">
              <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white font-semibold text-[10px] uppercase tracking-wider rounded-md">
                {event.tag}
              </div>
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-twilight-950 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-grow p-6">
              <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-amber-400 mb-3">
                <span>{event.date}</span>
                <span className="text-white bg-white/5 px-2 py-0.5 rounded-md border border-white/5">⭐ {event.rating}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white line-clamp-1 mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                {event.title}
              </h3>
              
              <p className="text-xs text-white/50 line-clamp-2 flex-grow mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="text-[11px] text-white/40 mb-5 flex items-center gap-1 font-medium">
                <span>📍</span> <span className="truncate">{event.location}</span>
              </div>

              {/* Card Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-white/30 tracking-wider">Passes From</span>
                  <span className="text-xl font-black text-white">${event.price}</span>
                </div>
                <Link
                  href={`/items/${event.id}`}
                  className="text-xs font-bold bg-white text-twilight-950 px-4 py-2.5 rounded-xl hover:bg-amber-400 hover:text-twilight-950 transition-colors shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}