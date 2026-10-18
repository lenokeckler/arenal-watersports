import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

export const RESERVATION_INTERVAL_TEST_CASES = [
  {
    input: {
      categoryId: "category-1",
      date: "2026-10-18",
      durationMinutes: 120,
      time: "10:00",
    },
    expected: {
      startsAt: "2026-10-18T16:00:00.000Z",
      endsAt: "2026-10-18T18:00:00.000Z",
    },
  },
  {
    input: {
      categoryId: "category-1",
      date: "2026-01-01",
      durationMinutes: 60,
      time: "00:00",
    },
    expected: {
      startsAt: "2026-01-01T06:00:00.000Z",
      endsAt: "2026-01-01T07:00:00.000Z",
    },
  },
  {
    input: {
      categoryId: "category-1",
      date: "2026-12-31",
      durationMinutes: 60,
      time: "23:00",
    },
    expected: {
      startsAt: "2027-01-01T05:00:00.000Z",
      endsAt: "2027-01-01T06:00:00.000Z",
    },
  },
] satisfies Array<{
  input: ReservationUnitAvailabilityInput;
  expected: { startsAt: string; endsAt: string };
}>;

export const RESERVATION_CATEGORY_AVAILABILITY_INPUT = {
  categoryId: "category-1",
  date: "2030-01-01",
  durationMinutes: 120,
  time: "10:00",
} satisfies ReservationUnitAvailabilityInput;

export const RESERVATION_CATEGORY_AVAILABILITY_ROW = {
  committed: 3,
  free: -1,
  usable: 2,
};
