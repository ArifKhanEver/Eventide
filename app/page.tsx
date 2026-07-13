
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      
      <section className="h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-twilight-900 to-transparent opacity-50"></div>
        
        <div className="z-10 space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight">
            Discover Exceptional <br />
            <span className="text-amber-400">Green Products</span>
          </h1>
          <p className="text-lg text-white/70">
            Join the eco-friendly revolution. Find the best sustainable items for your daily life.
          </p>
          <div className="pt-4">
            <button className="px-8 py-4 bg-amber-400 text-twilight-950 font-bold rounded-lg text-lg hover:bg-amber-500 transition-all transform hover:scale-105">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-48 bg-twilight-900 rounded-xl border border-twilight-800 p-6">
            Feature 1
          </div>
          <div className="h-48 bg-twilight-900 rounded-xl border border-twilight-800 p-6">
            Feature 2
          </div>
          <div className="h-48 bg-twilight-900 rounded-xl border border-twilight-800 p-6">
            Feature 3
          </div>
        </div>
      </section>

      
    </main>
  );
}