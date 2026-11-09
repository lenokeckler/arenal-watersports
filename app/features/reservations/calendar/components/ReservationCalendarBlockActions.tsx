import type { ReactElement } from "react";
import { Link } from "@/app/components";
import {
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import { resolveReservationEditPath } from "@/app/utils/reservations/resolveReservationEditPath";
import { resolveReservationSplitPath } from "@/app/utils/reservations/resolveReservationSplitPath";
import type { ReservationCalendarBlockActionsProps } from "../models/ReservationCalendarBlockActionsProps.interface";
import {
  RESERVATION_CALENDAR_BLOCK_ACTION_LINK_CLASS,
  RESERVATION_CALENDAR_BLOCK_ACTIONS_ROW_CLASS,
} from "../styles/ReservationCalendarBlockActions.styles";

export const ReservationCalendarBlockActions = ({
  block,
}: ReservationCalendarBlockActionsProps): ReactElement => (
  <div
    className={RESERVATION_CALENDAR_BLOCK_ACTIONS_ROW_CLASS}
  >
    <Link
      ariaLabel={[
        copy.MODIFY_RESERVATION_LABEL,
        block.customerName,
      ].join(STRING.SPACE)}
      className={
        RESERVATION_CALENDAR_BLOCK_ACTION_LINK_CLASS
      }
      href={resolveReservationEditPath(block.id)}
    >
      {copy.MODIFY_RESERVATION}
    </Link>
    <Link
      ariaLabel={[
        copy.SPLIT_RESERVATION_LABEL,
        block.customerName,
      ].join(STRING.SPACE)}
      className={
        RESERVATION_CALENDAR_BLOCK_ACTION_LINK_CLASS
      }
      href={resolveReservationSplitPath(block.id)}
    >
      {copy.SPLIT_RESERVATION}
    </Link>
  </div>
);
