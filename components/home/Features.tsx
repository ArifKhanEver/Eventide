interface FeatureCard {
  title: string;
  description: string;
  badge: string;
}

export default function Features() {
  const features: FeatureCard[] = [
    { 
      title: "Seamless Ticketing", 
      description: "Instant barcode and ticket generation upon dynamic payment verification with zero queue times.", 
      badge: "Fast" 
    },
    { 
      title: "Real-time Metrics", 
      description: "Monitor ticket distribution, visual user check-ins, and accurate revenue tracking charts.", 
      badge: "Analytics" 
    },
    { 
      title: "Access Control", 
      description: "Robust dashboard features for event organizers to check-in attendees securely via custom roles.", 
      badge: "Secure" 
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Engineered for <span className="text-amber-400">Perfect Execution</span>
        </h2>
        <p className="text-sm text-white/60 mt-3 leading-relaxed">
          Everything you need to discover premium events or host your massive audience seamlessly without bugs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="bg-twilight-900 border border-twilight-800 rounded-xl p-8 hover:border-dusk-500/40 transition-all duration-300 relative group"
          >
            <div className="absolute top-6 right-6 px-2.5 py-0.5 bg-twilight-800 text-dusk-400 border border-twilight-800 rounded-md text-xs font-medium">
              {feature.badge}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 mt-4 group-hover:text-amber-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}