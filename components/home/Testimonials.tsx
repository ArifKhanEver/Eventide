interface TestimonialItem {
  name: string;
  role: string;
  feedback: string;
  company: string;
}

export default function Testimonials() {
  const reviews: TestimonialItem[] = [
    {
      name: "Sarah Jenkins",
      role: "VP of Operations",
      company: "TechCorp Global",
      feedback: "Eventide completely transformed our enterprise deployment summit ecosystem. The architectural scaling and ticketing speed are flawless.",
    },
    {
      name: "Marcus Aurelius",
      role: "Festival Coordinator",
      company: "Neon Horizon Beats",
      feedback: "Managing telemetry check-ins for over 5,000 live concert enthusiasts was perfectly seamless. The visual metrics stack saved us hours.",
    },
    {
      name: "Dr. Alan Stone",
      role: "Director of Research",
      company: "Quantum Labs",
      feedback: "The robust TypeScript structures allowed our internal software engineers to integrate secure payment nodes without friction.",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dusk-500/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="text-center max-w-xl mx-auto mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-dusk-400 block mb-2">Proven Track Record</span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Validated by <span className="text-amber-400">Industry Giants</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {reviews.map((rev, idx) => (
          <div 
            key={idx} 
            className="bg-gradient-to-b from-twilight-900 to-twilight-950 border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:border-white/10 transition-all duration-300"
          >
            <div className="text-4xl text-amber-400/20 font-serif leading-none select-none mb-4">“</div>
            <p className="text-sm md:text-base text-white/70 italic leading-relaxed font-light mb-8">
              {rev.feedback}
            </p>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{rev.name}</h4>
                <p className="text-[11px] text-white/40 mt-0.5 font-medium">{rev.role}</p>
              </div>
              <span className="text-[10px] font-bold text-dusk-400 uppercase tracking-widest bg-dusk-500/10 px-2.5 py-1 rounded-md border border-dusk-500/10">
                {rev.company}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}