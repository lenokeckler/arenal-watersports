import type { ReservationFormScreenCopy } from "./ReservationFormScreenCopy.interface";
import type { ReservationFormValuesProps } from "./ReservationFormValuesProps.interface";

export interface ReservationFormHeaderProps extends ReservationFormValuesProps {
  copy?: ReservationFormScreenCopy;
}
