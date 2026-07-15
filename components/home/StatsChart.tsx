// components/StatsChart.tsx
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

type MonthlyPoint = { month: string; events: number; reviews: number };

export default function StatsChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" stroke="#8a7fe0" opacity={0.5} fontSize={12} />
        <YAxis stroke="#8a7fe0" opacity={0.5} fontSize={12} allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1b1d3c", borderColor: "#272a5c", borderRadius: "12px" }}
          labelStyle={{ color: "#ffb562" }}
        />
        <Area type="monotone" dataKey="events" name="Events Created" stroke="#ff9f4c" fillOpacity={0.1} fill="#ff9f4c" />
        <Area type="monotone" dataKey="reviews" name="Reviews Submitted" stroke="#6c5ce7" fillOpacity={0.1} fill="#6c5ce7" />
      </AreaChart>
    </ResponsiveContainer>
  );
}