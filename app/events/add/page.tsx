// app/events/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input, TextArea, Button } from "@heroui/react";
import type { ApiResponse } from "@/types";
import type { IEvent } from "@/models/Event";

const CATEGORIES = [
  "Conference",
  "Concert",
  "Workshop",
  "Sports",
  "Networking",
  "Festival",
] as const;

type EventFormData = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  capacity: number;
  coverImage?: string;
};

export default function AddEventPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // register/handleSubmit/formState come from useForm — register() wires a
  // native-ish input to RHF's internal state via {onChange, onBlur, name, ref},
  // handleSubmit wraps your submit function and blocks it if validation fails.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          price: Number(data.price),
          capacity: Number(data.capacity),
        }),
      });

      if (res.status === 401) {
        router.push("/login?redirect=/events/add");
        return;
      }

      const json: ApiResponse<IEvent> = await res.json();
      if (!json.success) {
        setServerError(json.error);
        return;
      }

      router.push("/events/manage");
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-twilight-950 px-4 py-10 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Add New Event</h1>
        <p className="mb-8 text-foreground/70">
          Fill in the details below to publish a new event on Eventide.
        </p>

        {serverError && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Field label="Title" error={errors.title?.message}>
            <Input
              className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
              placeholder="e.g. Dhaka Tech Summit 2026"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 5, message: "At least 5 characters" },
              })}
            />
          </Field>

          <Field label="Short Description" error={errors.shortDescription?.message}>
            <Input
              className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
              placeholder="One line summary shown on cards"
              {...register("shortDescription", {
                required: "Short description is required",
                maxLength: { value: 150, message: "Keep it under 150 characters" },
              })}
            />
          </Field>

          <Field label="Full Description" error={errors.fullDescription?.message}>
            <TextArea
              className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
              rows={5}
              placeholder="Full details shown on the event page"
              {...register("fullDescription", {
                required: "Full description is required",
                minLength: { value: 20, message: "At least 20 characters" },
              })}
            />
          </Field>

          <Field label="Category" error={errors.category?.message}>
            <select
              className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
              defaultValue=""
              {...register("category", { required: "Please pick a category" })}
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date" error={errors.date?.message}>
              <input
                type="date"
                className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
                {...register("date", { required: "Date is required" })}
              />
            </Field>
            <Field label="Time" error={errors.time?.message}>
              <input
                type="time"
                className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
                {...register("time", { required: "Time is required" })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Venue" error={errors.venue?.message}>
              <Input
                className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
                placeholder="e.g. Bangabandhu Stadium"
                {...register("venue", { required: "Venue is required" })}
              />
            </Field>
            <Field label="City" error={errors.city?.message}>
              <Input
                className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
                placeholder="e.g. Dhaka"
                {...register("city", { required: "City is required" })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (৳, 0 = free)" error={errors.price?.message}>
              <Input
                type="number"
                className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Price can't be negative" },
                })}
              />
            </Field>
            <Field label="Capacity" error={errors.capacity?.message}>
              <Input
                type="number"
                className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
                {...register("capacity", {
                  required: "Capacity is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must allow at least 1 attendee" },
                })}
              />
            </Field>
          </div>

          <Field label="Cover Image URL (optional)" error={errors.coverImage?.message}>
            <Input
              className="w-full rounded-lg border border-twilight-800 bg-twilight-900 px-3 py-2 text-sm"
              placeholder="https://..."
              {...register("coverImage", {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Must be a valid URL starting with http(s)://",
                },
              })}
            />
          </Field>

          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-amber-400 py-3 font-semibold text-twilight-950 hover:bg-amber-500 disabled:opacity-60"
          >
            {isSubmitting ? "Publishing..." : "Publish Event"}
          </Button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-foreground/70">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}