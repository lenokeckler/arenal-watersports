import type { RESERVATION_STATUS } from "@/app/constants";

export type ReservationChargeFixtureStatus =
  | typeof RESERVATION_STATUS.CANCELLED
  | typeof RESERVATION_STATUS.CLOSED
  | typeof RESERVATION_STATUS.SCHEDULED;
