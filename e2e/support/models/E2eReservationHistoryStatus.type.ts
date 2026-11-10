import type { E2E_RESERVATION_HISTORY_STATUS } from "../../constants/E2eReservationHistory.constants";

export type E2eReservationHistoryStatus =
  (typeof E2E_RESERVATION_HISTORY_STATUS)[keyof typeof E2E_RESERVATION_HISTORY_STATUS];
