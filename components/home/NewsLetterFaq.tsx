"use client";

import React, { useState } from "react";

export default function NewsletterFaq() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
      
      {/* FAQ Block - 7 Columns */}
      <div className="lg:col-span-7 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-dusk-400 block mb-2">Clear Answers</span>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-8">
          Platform Architecture FAQ
        </h2>
        
        <div className="bg-twilight-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
          <h4 className="text-sm font-bold text-amber-400 mb-2 tracking-tight">How secure is the ticket distribution network?</h4>
          <p className="text-xs text-white/50 leading-relaxed font-light">Every single access pass is cryptographically generated and stored securely against authorized database nodes immediately upon completed transaction events.</p>
        </div>
        
        <div className="bg-twilight-900/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
          <h4 className="text-sm font-bold text-amber-400 mb-2 tracking-tight">Can custom managers manipulate active event telemetry?</h4>
          <p className="text-xs text-white/50 leading-relaxed font-light">No. Granular backend authorization parameters safely enforce strict role controls. Regular organizers retain create/delete parameters exclusively for their own objects.</p>
        </div>
      </div>

      {/* Newsletter Block - 5 Columns */}
      <div className="lg:col-span-5 bg-gradient-to-b from-twilight-900 to-twilight-950 border border-white/5 rounded-2xl p-8 lg:p-10 relative overflow-hidden self-stretch flex flex-col justify-center">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none"></div>
        
        <h3 className="text-2xl font-black text-white tracking-tight mb-2">Join the Inner Circle</h3>
        <p className="text-xs text-white/50 mb-8 leading-relaxed font-light">
          Get ultra-exclusive primary access notifications for high-tier tech gatherings and closed acoustic sets.
        </p>
        
        {subscribed ? (
          <div className="p-4 bg-amber-400/10 border border-amber-400/20 rounded-xl text-amber-400 text-xs font-semibold tracking-wide text-center animate-fade-in">
            &Check; Subscription fully authorized and secured.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              placeholder="Enter corporate email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-twilight-950 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white outline-none focus:border-amber-400/50 focus:bg-twilight-900 transition-all placeholder:text-white/20 font-medium"
            />
            <button 
              type="submit" 
              className="cursor-pointer w-full bg-amber-400 hover:bg-amber-500 text-twilight-950 font-extrabold py-3.5 rounded-xl transition-colors text-xs tracking-wider uppercase shadow-xl shadow-amber-500/5"
            >
              Secure Subscriptions
            </button>
          </form>
        )}
      </div>

    </section>
  );
}