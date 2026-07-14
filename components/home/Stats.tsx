"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface ChartDataPoint {
  month: string;
  registrations: number;
  events: number;
}

export default function Stats() {
  const data: ChartDataPoint[] = [
    { month: "Jan", registrations: 1200, events: 14 },
    { month: "Feb", registrations: 2100, events: 22 },
    { month: "Mar", registrations: 1800, events: 19 },
    { month: "Apr", registrations: 3400, events: 35 },
    { month: "May", registrations: 4100, events: 48 },
    { month: "Jun", registrations: 5900, events: 62 },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Platform Hub <span className="text-amber-400">Scale</span>
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Eventide scales gracefully to support thousands of simultaneous dynamic check-ins and active organizer payouts.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-twilight-900 p-4 rounded-xl border border-twilight-800">
              <span className="block text-2xl font-bold text-white">450+</span>
              <span className="text-xs text-white/40">Total Events Hosted</span>
            </div>
            <div className="bg-twilight-900 p-4 rounded-xl border border-twilight-800">
              <span className="block text-2xl font-bold text-white">18K+</span>
              <span className="text-xs text-white/40">Tickets Distributed</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 h-72 bg-twilight-900 p-6 rounded-xl border border-twilight-800">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#8a7fe0" opacity={0.5} fontSize={12} />
              <YAxis stroke="#8a7fe0" opacity={0.5} fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1b1d3c", borderColor: "#272a5c", borderRadius: "12px" }}
                labelStyle={{ color: "#ffb562" }}
              />
              <Area type="monotone" dataKey="registrations" stroke="#ff9f4c" fillOpacity={0.1} fill="#ff9f4c" />
              <Area type="monotone" dataKey="events" stroke="#6c5ce7" fillOpacity={0.1} fill="#6c5ce7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </section>
  );
}