import type { ReactElement } from "react";
import { Link } from "@/app/components";
import {
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import { resolveReservationCancelPath } from "@/app/utils/reservations/resolveReservationCancelPath";
import type { ReservationCalendarBlockActionsProps } from "../models/ReservationCalendarBlockActionsProps.interface";
import { RESERVATION_CALENDAR_BLOCK_ACTION_LINK_CLASS } from "../styles/ReservationCalendarBlockActions.styles";

export const ReservationCalendarCancelLink = ({
  block,
}: ReservationCalendarBlockActionsProps): ReactElement => (
  <Link
    ariaLabel={[
      copy.CANCEL_RESERVATION_LABEL,
      block.customerName,
    ].join(STRING.SPACE)}
    className={RESERVATION_CALENDAR_BLOCK_ACTION_LINK_CLASS}
    href={resolveReservationCancelPath(block.id)}
  >
    {copy.CANCEL_RESERVATION}
  </Link>
);
