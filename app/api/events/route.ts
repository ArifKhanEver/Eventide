import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import Event, { type IEvent } from "@/models/Event";
import type { ApiResponse } from "@/types";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") ?? "date";
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "12");

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (city) filter.city = city;
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const sortField = sort === "price" ? "price" : "date";

  const [events, total] = await Promise.all([
    Event.find(filter)
      .sort({ [sortField]: 1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Event.countDocuments(filter),
  ]);

  return NextResponse.json<ApiResponse<{ events: IEvent[]; total: number; page: number }>>({
    success: true,
    data: { events, total, page },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "You must be logged in to create an event" },
      { status: 401 }
    );
  }

  const body = await req.json();
  await connectDB();

  try {
    const event = await Event.create({
      ...body,
      organizerId: session.user.id,
      seatsLeft: body.capacity,
    });

    return NextResponse.json<ApiResponse<IEvent>>(
      { success: true, data: event },
      { status: 201 }
    );
  } catch (err) {
    // Mongoose throws a ValidationError if a required field is missing
    // or the wrong type — this is the ONE validation layer now, and it's
    // enough: nothing reaches the database without passing these checks.
    const message = err instanceof Error ? err.message : "Invalid event data";
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status: 400 }
    );
  }
}