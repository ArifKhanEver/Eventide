"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiStar } from "react-icons/fi";
import type { ApiResponse } from "@/types";
import type { IReview } from "@/models/Review";

export default function ReviewForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      const json: ApiResponse<IReview> = await res.json();

      if (!json.success) {
        setError(json.error);
        return;
      }

      setRating(0);
      setComment("");
      router.refresh(); // re-runs the server component so the new review shows up in the list
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 rounded-xl border border-twilight-800 bg-twilight-900 p-4"
    >
      <p className="text-sm font-medium">Leave a review</p>

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          const filled = starValue <= (hoverRating || rating);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
              className="cursor-pointer text-xl text-amber-400"
            >
              <FiStar className={filled ? "fill-amber-400" : "opacity-30"} />
            </button>
          );
        })}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
        className="w-full rounded-lg border border-twilight-800 bg-twilight-950 px-3 py-2 text-sm outline-none"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer self-start rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-twilight-950 hover:bg-amber-500 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}