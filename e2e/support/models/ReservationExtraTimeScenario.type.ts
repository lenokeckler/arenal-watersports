import type { E2E_RESERVATION_EXTRA_TIME_SCENARIO } from "../../constants/E2eReservationExtraTime.constants";

export type ReservationExtraTimeScenario =
  (typeof E2E_RESERVATION_EXTRA_TIME_SCENARIO)[keyof typeof E2E_RESERVATION_EXTRA_TIME_SCENARIO];
