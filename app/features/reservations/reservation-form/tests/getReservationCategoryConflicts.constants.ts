import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

export const RESERVATION_CATEGORY_CONFLICT_INPUT = {
  categoryId: "category-1",
  date: "2030-01-01",
  durationMinutes: 120,
  time: "10:00",
} satisfies ReservationUnitAvailabilityInput;

export const RESERVATION_CATEGORY_CONFLICT_ROW = {
  code: "RES-2030-001",
  customer_name: "Ana Sol�s",
  ends_at: "2030-01-01T17:00:00.000Z",
  reservation_id: "reservation-1",
  starts_at: "2030-01-01T15:00:00.000Z",
} satisfies ReservationCategoryConflict;
