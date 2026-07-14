import Link from "next/link";

interface CategoryItem {
  name: string;
  count: number;
  icon: string;
  slug: string;
  gradient: string;
}

export default function Categories() {
  const categories: CategoryItem[] = [
    { name: "Tech Conferences", count: 12, icon: "💻", slug: "tech", gradient: "from-dusk-500/20 to-transparent" },
    { name: "Music Concerts", count: 24, icon: "🎵", slug: "music", gradient: "from-amber-500/20 to-transparent" },
    { name: "Art Exhibitions", count: 8, icon: "🎨", slug: "art", gradient: "from-emerald-500/20 to-transparent" },
    { name: "Business Workshops", count: 15, icon: "📊", slug: "business", gradient: "from-blue-500/20 to-transparent" },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 relative">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-dusk-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-dusk-400 block mb-2">Curated Experiences</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Explore by <span className="text-amber-400">Elite Categories</span>
          </h2>
        </div>
        <Link href="/explore" className="group text-sm font-bold text-white/80 hover:text-amber-400 mt-4 md:mt-0 transition-colors flex items-center gap-2">
          Browse All Categories 
          <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/explore?category=${category.slug}`}
            className="relative overflow-hidden bg-gradient-to-b from-twilight-900 to-twilight-950/40 border border-white/5 rounded-2xl p-8 hover:border-dusk-500/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-dusk-500/5"
          >
            {/* Ambient hover glow inside card */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-twilight-800 border border-white/5 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:border-amber-400/30 transition-all duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-white/40 font-medium tracking-wide">
                {category.count} Premium Events Live
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}