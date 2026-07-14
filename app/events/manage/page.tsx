// app/events/manage/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import type { ApiResponse } from "@/types";
import type { IEvent } from "@/models/Event";
import { FiPlus, FiTrash2, FiEye } from "react-icons/fi";

type EventRow = Omit<IEvent, "date" | "createdAt" | "updatedAt" | "organizerId"> & {
  _id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  organizerId: string;
};

export default function ManageEventsPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";

  useEffect(() => {
    if (sessionPending || !session) return;

    (async () => {
      setIsLoading(true);
      try {
        // No organizerId filter on the API, so we pull a generous page and
        // filter client-side. Fine at assignment scale; would need a real
        // `?organizerId=` param on the route for a larger dataset.
        const res = await fetch("/api/events?limit=100&sort=date");
        const json: ApiResponse<{ events: EventRow[]; total: number }> = await res.json();

        if (!json.success) {
          setError(json.error);
          return;
        }

        const mine = isAdmin
          ? json.data.events
          : json.data.events.filter((e) => e.organizerId === session.user.id);

        setEvents(mine);
      } catch {
        setError("Couldn't load your events.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [session, sessionPending, isAdmin]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this event? This can't be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      const json: ApiResponse<{ deleted: true }> = await res.json();

      if (!json.success) {
        setError(json.error);
        return;
      }
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch {
      setError("Couldn't delete this event.");
    } finally {
      setDeletingId(null);
    }
  };

  if (sessionPending || isLoading) {
    return (
      <main className="min-h-screen bg-twilight-950 px-4 py-10 text-foreground sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl animate-pulse space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-twilight-900" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-twilight-950 px-4 py-10 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {isAdmin ? "Manage All Events" : "My Events"}
            </h1>
            <p className="text-foreground/70">
              {isAdmin
                ? "You're viewing every event on the platform as an admin."
                : "Events you've created."}
            </p>
          </div>
          <Link
            href="/events/add"
            className="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-twilight-950 hover:bg-amber-500"
          >
            <FiPlus /> Add Event
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <p className="text-foreground/60">
            {isAdmin ? "No events on the platform yet." : "You haven't created any events yet."}
          </p>
        ) : (
          <>
            {/* Table — desktop/tablet */}
            <div className="hidden overflow-hidden rounded-2xl border border-twilight-800 sm:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-twilight-900 text-foreground/60">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id} className="border-t border-twilight-800 bg-twilight-950">
                      <td className="max-w-[200px] truncate px-4 py-3">{event.title}</td>
                      <td className="px-4 py-3">{event.category}</td>
                      <td className="px-4 py-3">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{event.city}</td>
                      <td className="px-4 py-3">{event.price === 0 ? "Free" : `৳${event.price}`}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/events/${event._id}`}
                            className="text-dusk-400 hover:text-dusk-300"
                            aria-label="View event"
                          >
                            <FiEye />
                          </Link>
                          <button
                            onClick={() => handleDelete(event._id)}
                            disabled={deletingId === event._id}
                            className="text-red-400 hover:text-red-300 disabled:opacity-50"
                            aria-label="Delete event"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards — mobile */}
            <div className="flex flex-col gap-3 sm:hidden">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="rounded-xl border border-twilight-800 bg-twilight-900 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-foreground/60">
                        {event.category} · {event.city}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {new Date(event.date).toLocaleDateString()} ·{" "}
                        {event.price === 0 ? "Free" : `৳${event.price}`}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 gap-3">
                      <Link href={`/events/${event._id}`} className="text-dusk-400">
                        <FiEye />
                      </Link>
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={deletingId === event._id}
                        className="text-red-400 disabled:opacity-50"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}