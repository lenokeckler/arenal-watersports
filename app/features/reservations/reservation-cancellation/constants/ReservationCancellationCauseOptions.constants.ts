import { RESERVATION_CANCELLATION_CAUSE } from "./ReservationCancellationCause.constants";
import { RESERVATION_CANCELLATION_FIELD_ID } from "./ReservationCancellationUi.constants";

export const RESERVATION_CANCELLATION_CAUSE_OPTIONS = [
  RESERVATION_CANCELLATION_CAUSE.WEATHER,
  RESERVATION_CANCELLATION_CAUSE.TRIP_PROBLEM,
].map((value) => ({
  id: `${RESERVATION_CANCELLATION_FIELD_ID.CAUSE}-${value}`,
  value,
}));
