import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import Event, { type IEvent } from "@/models/Event";
import type { ApiResponse } from "@/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  await connectDB();

  const event = await Event.findById(id);

  if (!event) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json<ApiResponse<IEvent>>({ success: true, data: event });
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "You must be logged in" },
      { status: 401 }
    );
  }

  await connectDB();
  const event = await Event.findById(id);

  if (!event) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Event not found" },
      { status: 404 }
    );
  }

  const isOwner = event.organizerId.toString() === session.user.id;
  const isAdmin = (session.user as { role?: string }).role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "You don't have permission to edit this event" },
      { status: 403 }
    );
  }

  const body = await req.json();

  try {
    Object.assign(event, body);
    await event.save(); // Mongoose validates again here, on save
    return NextResponse.json<ApiResponse<IEvent>>({ success: true, data: event });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid update data";
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "You must be logged in" },
      { status: 401 }
    );
  }

  await connectDB();
  const event = await Event.findById(id);

  if (!event) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Event not found" },
      { status: 404 }
    );
  }

  const isOwner = event.organizerId.toString() === session.user.id;
  const isAdmin = (session.user as { role?: string }).role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "You don't have permission to delete this event" },
      { status: 403 }
    );
  }

  await event.deleteOne();

  return NextResponse.json<ApiResponse<{ deleted: true }>>({
    success: true,
    data: { deleted: true },
  });
}