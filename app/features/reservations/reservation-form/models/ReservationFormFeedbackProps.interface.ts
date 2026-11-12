import type { ReservationFormCardProps } from "./ReservationFormCardProps.interface";
import type { ReservationFormScreenCopy } from "./ReservationFormScreenCopy.interface";

export interface ReservationFormFeedbackProps extends ReservationFormCardProps {
  copy?: ReservationFormScreenCopy;
}
