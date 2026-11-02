import type { ReactNode } from "react";
import type { ReservationCalendarBlock } from "./ReservationCalendarBlock.interface";

export type ReservationCalendarBlockActionsRenderer = (
  block: ReservationCalendarBlock
) => ReactNode;
