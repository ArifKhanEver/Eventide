// types/index.ts

// Discriminated union: TypeScript narrows on `success`. Once you check
// `if (response.success)`, TS knows `response.data` exists in that branch,
// and if you check `if (!response.success)`, TS knows `response.error` exists.
// That's why every API route response gets typed as ApiResponse<T> — it forces
// both success and error cases to be handled explicitly on the frontend.
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type EventCategory =
  | "Conference"
  | "Concert"
  | "Workshop"
  | "Sports"
  | "Networking"
  | "Festival";

export type EventStatus = "upcoming" | "ongoing" | "completed";

export type UserRole = "user" | "admin";