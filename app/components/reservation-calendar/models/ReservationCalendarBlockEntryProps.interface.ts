import type { ReactNode } from "react";
import type { ReservationCalendarBlockProps } from "./ReservationCalendarBlockProps.interface";

export interface ReservationCalendarBlockEntryProps extends ReservationCalendarBlockProps {
  actions?: ReactNode;
  enableDetailLink?: boolean;
}
