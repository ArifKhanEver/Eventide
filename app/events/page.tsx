// app/events/page.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TextField,
  Input,
  Label,
  Select,
  ListBox,
  Button,
  Pagination,
} from "@heroui/react";
import type { Key } from "@heroui/react";
import { FiSearch, FiMapPin, FiCalendar, FiTag } from "react-icons/fi";
import type { IEvent } from "@/models/Event";
import type { ApiResponse } from "@/types";

// The API returns Mongoose docs through JSON.stringify, so ObjectId/Date
// fields arrive as plain strings — this is the "shape after the wire",
// not the Mongoose IEvent shape directly.
type EventCard = Omit<IEvent, "date" | "createdAt" | "updatedAt"> & {
  _id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = [
  "Conference",
  "Concert",
  "Workshop",
  "Sports",
  "Networking",
  "Festival",
] as const;

const LIMIT = 12;

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<Key | null>(null);
  const [city, setCity] = useState("");
  const [sort, setSort] = useState<Key | null>("date");
  const [page, setPage] = useState(1);

  const [events, setEvents] = useState<EventCard[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the free-text search so we don't hit the API on every
  // keystroke. useRef holds the timeout id across renders without
  // triggering a re-render itself (unlike useState would).
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to page 1 whenever the search term changes
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (category) params.set("category", String(category));
      if (city) params.set("city", city);
      if (sort) params.set("sort", String(sort));
      params.set("page", String(page));
      params.set("limit", String(LIMIT));

      const res = await fetch(`/api/events?${params.toString()}`);
      const json: ApiResponse<{
        events: EventCard[];
        total: number;
        page: number;
      }> = await res.json();

      if (!json.success) {
        setError(json.error);
        return;
      }
      setEvents(json.data.events);
      setTotal(json.data.total);
    } catch {
      setError("Couldn't load events. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, category, city, sort, page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <main className="min-h-screen bg-twilight-950 px-4 py-10 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">Explore Events</h1>
        <p className="mb-8 text-foreground/70">
          Find conferences, concerts, workshops, and more happening near you.
        </p>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl bg-twilight-900 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <TextField className="w-full" aria-label="Search events">
            <Label className="mb-1 block text-sm text-foreground/70">
              Search
            </Label>
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <Input
                className="w-full rounded-lg border border-twilight-800 bg-twilight-950 py-2 pl-9 pr-3 text-sm"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </TextField>

          {/* Category select — value/onChange is the v3 API (not the old
              v2 selectedKeys/onSelectionChange pair) */}
          <Select
            className="w-full"
            placeholder="All categories"
            value={category}
            onChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
          >
            <Label className="mb-1 block text-sm text-foreground/70">
              Category
            </Label>
            <Select.Trigger className="w-full rounded-lg border border-twilight-800 bg-twilight-950 px-3 py-2 text-sm">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="rounded-lg border border-twilight-800 bg-twilight-900">
              <ListBox>
                <ListBox.Item id="" textValue="All categories">
                  All categories
                </ListBox.Item>
                {CATEGORIES.map((cat) => (
                  <ListBox.Item key={cat} id={cat} textValue={cat}>
                    {cat}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField className="w-full" aria-label="City">
            <Label className="mb-1 block text-sm text-foreground/70">
              City
            </Label>
            <div className="relative">
              <FiMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <Input
                className="w-full rounded-lg border border-twilight-800 bg-twilight-950 py-2 pl-9 pr-3 text-sm"
                placeholder="e.g. Dhaka"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </TextField>

          <Select
            className="w-full"
            value={sort}
            onChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          >
            <Label className="mb-1 block text-sm text-foreground/70">
              Sort by
            </Label>
            <Select.Trigger className="w-full rounded-lg border border-twilight-800 bg-twilight-950 px-3 py-2 text-sm">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="rounded-lg border border-twilight-800 bg-twilight-900">
              <ListBox>
                <ListBox.Item id="date" textValue="Date">
                  Date (soonest first)
                </ListBox.Item>
                <ListBox.Item id="price" textValue="Price">
                  Price (lowest first)
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Card grid — 4 per row on desktop per rubric */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: LIMIT }).map((_, i) => <CardSkeleton key={i} />)
            : events.map((event) => <EventCardItem key={event._id} event={event} />)}
        </div>

        {!isLoading && events.length === 0 && (
          <p className="mt-12 text-center text-foreground/60">
            No events match your filters. Try widening your search.
          </p>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination>
              <Pagination.Content className="gap-1">
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <Pagination.PreviousIcon />
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageList(page, totalPages).map((item, idx) =>
                  item === "ellipsis" ? (
                    <Pagination.Item key={`e-${idx}`}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={item}>
                      <Pagination.Link
                        isActive={item === page}
                        onPress={() => setPage(item)}
                      >
                        {item}
                      </Pagination.Link>
                    </Pagination.Item>
                  )
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}

function EventCardItem({ event }: { event: EventCard }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-twilight-800 bg-twilight-900 transition-transform hover:-translate-y-1">
      <div className="relative h-44 w-full bg-twilight-800">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-foreground/30">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-dusk-500/90 px-3 py-1 text-xs font-medium text-white">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{event.title}</h3>
        <p className="line-clamp-2 text-sm text-foreground/70">
          {event.shortDescription}
        </p>

        <div className="mt-auto flex flex-col gap-1 pt-2 text-xs text-foreground/60">
          <span className="flex items-center gap-1">
            <FiCalendar /> {new Date(event.date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin /> {event.city}
          </span>
          <span className="flex items-center gap-1">
            <FiTag /> {event.price === 0 ? "Free" : `৳${event.price}`}
          </span>
        </div>

        <Button
          className="mt-3 w-full rounded-lg bg-amber-400 py-2 text-sm font-semibold text-twilight-950 hover:bg-amber-500"
          onPress={() => {
            window.location.href = `/events/${event._id}`;
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-twilight-800 bg-twilight-900">
      <div className="h-44 w-full bg-twilight-800" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded bg-twilight-800" />
        <div className="h-3 w-full rounded bg-twilight-800" />
        <div className="h-3 w-2/3 rounded bg-twilight-800" />
        <div className="h-9 w-full rounded-lg bg-twilight-800" />
      </div>
    </div>
  );
}

// Builds a compact page list like [1, "ellipsis", 4, 5, 6, "ellipsis", 20]
// so Pagination doesn't render 100 links for a large result set.
function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");

  pages.push(total);
  return pages;
}