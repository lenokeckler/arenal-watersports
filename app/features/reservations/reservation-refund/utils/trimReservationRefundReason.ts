import { STRING } from "@/app/constants";
import { RESERVATION_REFUND_REASON_EDGE_PATTERN } from "../constants/ReservationRefundReasonPatterns.constants";

export const trimReservationRefundReason = (
  text: string
): string =>
  text.replace(
    RESERVATION_REFUND_REASON_EDGE_PATTERN,
    STRING.Empty
  );
