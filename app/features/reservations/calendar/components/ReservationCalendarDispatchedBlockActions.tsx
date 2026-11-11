import type { ReactElement } from "react";
import type { ReservationCalendarBlockActionsProps } from "../models/ReservationCalendarBlockActionsProps.interface";
import { RESERVATION_CALENDAR_BLOCK_ACTIONS_ROW_CLASS } from "../styles/ReservationCalendarBlockActions.styles";
import { ReservationCalendarCancelLink } from "./ReservationCalendarCancelLink";

export const ReservationCalendarDispatchedBlockActions = ({
  block,
}: ReservationCalendarBlockActionsProps): ReactElement => (
  <div
    className={RESERVATION_CALENDAR_BLOCK_ACTIONS_ROW_CLASS}
  >
    <ReservationCalendarCancelLink block={block} />
  </div>
);
