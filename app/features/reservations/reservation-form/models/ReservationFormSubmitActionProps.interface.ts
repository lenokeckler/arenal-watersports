import type { ReservationFormScreenCopy } from "./ReservationFormScreenCopy.interface";
import type { ReservationFormValuesProps } from "./ReservationFormValuesProps.interface";

export interface ReservationFormSubmitActionProps extends ReservationFormValuesProps {
  copy?: ReservationFormScreenCopy;
  isDisabled: boolean;
}
