import type { UnitReservationHistoryViewProps } from "./UnitReservationHistoryViewProps.interface";

export type UnitReservationHistoryViewModelProps = Pick<
  UnitReservationHistoryViewProps,
  "fetchFailed" | "reservations"
>;
