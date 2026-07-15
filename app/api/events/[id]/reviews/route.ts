import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import Event from "@/models/Event";
import Review, { type IReview } from "@/models/Review";
import type { ApiResponse } from "@/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: RouteContext) {
  const { id: eventId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "You must be logged in to leave a review" },
      { status: 401 }
    );
  }

  await connectDB();
  const event = await Event.findById(eventId);

  if (!event) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Event not found" },
      { status: 404 }
    );
  }

  // Organizers can't review their own event.
  if (event.organizerId.toString() === session.user.id) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "You can't review your own event" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const rating = Number(body.rating);
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Rating must be between 1 and 5" },
      { status: 400 }
    );
  }
  if (comment.length < 5) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Comment must be at least 5 characters" },
      { status: 400 }
    );
  }

  try {
    const review = await Review.create({
      eventId,
      userId: session.user.id,
      userName: session.user.name,
      rating,
      comment,
    });

    return NextResponse.json<ApiResponse<IReview>>(
      { success: true, data: review },
      { status: 201 }
    );
  } catch (err: unknown) {

    if (typeof err === "object" && err !== null && "code" in err && err.code === 11000) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "You've already reviewed this event" },
        { status: 409 }
      );
    }
    const message = err instanceof Error ? err.message : "Couldn't submit review";
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status: 400 }
    );
  }
}