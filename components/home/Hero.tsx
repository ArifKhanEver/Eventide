import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-[65vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-gradient-to-b from-twilight-900 via-twilight-950/40 to-transparent">
      
      {/* Background radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dusk-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="z-10 space-y-6 max-w-4xl">
        <span className="px-4 py-1.5 bg-twilight-800 border border-twilight-800 text-amber-400 rounded-full text-xs font-semibold tracking-wider uppercase inline-block">
          ⚡ Next-Gen Event Architecture
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-none">
          Discover Extraordinary <br />
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-dusk-400 bg-clip-text text-transparent">
            Live Experiences
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-normal leading-relaxed">
          Book seamless tickets, manage registrations, and experience world-class conferences, concerts, and tech meetups effortlessly.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/explore" 
            className="px-8 py-3.5 bg-amber-400 text-twilight-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:bg-amber-500 transition-all transform hover:-translate-y-0.5 text-center"
          >
            Find Next Event
          </Link>
          <Link 
            href="/items/add" 
            className="px-8 py-3.5 bg-twilight-900 border border-twilight-800 text-white font-semibold rounded-xl hover:bg-twilight-800 hover:border-twilight-700 transition-all text-center"
          >
            Create Event
          </Link>
        </div>
      </div>
    </section>
  );
}