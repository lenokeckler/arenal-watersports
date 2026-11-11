import type { ReservationCancellationCause } from "../models/ReservationCancellationCause.type";

export const RESERVATION_CANCELLATION_CAUSE = {
  TRIP_PROBLEM: "trip_problem",
  WEATHER: "weather",
} as const satisfies Record<
  string,
  ReservationCancellationCause
>;
