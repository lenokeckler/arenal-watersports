import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

export const RESERVATION_CATEGORY_CONFLICT_WARNING_TEST = {
  CODE: "RES-2028-001",
  CUSTOMER_NAME: "Ana Solís",
  INITIAL_REFRESH_KEY: 0,
  NEXT_REFRESH_KEY: 1,
  NEXT_CATEGORY_ID: "category-2",
  NEXT_DATE: "2028-03-01",
  REQUEST: {
    categoryId: "category-1",
    date: "2030-01-01",
    durationMinutes: 120,
    time: "10:00",
  } satisfies ReservationUnitAvailabilityInput,
  INTERVAL:
    "martes, 29 de febrero de 2028 · 09:00 a. m.–10:00 a. m.",
  RPC_ROW: {
    code: "RES-2028-001",
    customer_name: "Ana Solís",
    ends_at: "2028-02-29T16:00:00.000Z",
    reservation_id: "reservation-1",
    starts_at: "2028-02-29T15:00:00.000Z",
  } satisfies ReservationCategoryConflict,
  REFRESHED_RPC_ROW: {
    code: "RES-2028-002",
    customer_name: "Ana Solís",
    ends_at: "2028-02-29T16:00:00.000Z",
    reservation_id: "reservation-2",
    starts_at: "2028-02-29T15:00:00.000Z",
  } satisfies ReservationCategoryConflict,
} satisfies {
  CODE: string;
  CUSTOMER_NAME: string;
  INITIAL_REFRESH_KEY: number;
  NEXT_REFRESH_KEY: number;
  INTERVAL: string;
  NEXT_CATEGORY_ID: string;
  NEXT_DATE: string;
  REQUEST: ReservationUnitAvailabilityInput;
  RPC_ROW: ReservationCategoryConflict;
  REFRESHED_RPC_ROW: ReservationCategoryConflict;
};
