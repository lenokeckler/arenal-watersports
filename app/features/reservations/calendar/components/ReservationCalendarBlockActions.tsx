import type { ReactElement } from "react";
import { Link } from "@/app/components";
import {
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import { resolveReservationEditPath } from "@/app/utils/reservations/resolveReservationEditPath";
import type { ReservationCalendarBlockActionsProps } from "../models/ReservationCalendarBlockActionsProps.interface";
import { RESERVATION_CALENDAR_BLOCK_MODIFY_LINK_CLASS } from "../styles/ReservationCalendarBlockActions.styles";

export const ReservationCalendarBlockActions = ({
  block,
}: ReservationCalendarBlockActionsProps): ReactElement => (
  <Link
    ariaLabel={[
      copy.MODIFY_RESERVATION_LABEL,
      block.customerName,
    ].join(STRING.SPACE)}
    className={RESERVATION_CALENDAR_BLOCK_MODIFY_LINK_CLASS}
    href={resolveReservationEditPath(block.id)}
  >
    {copy.MODIFY_RESERVATION}
  </Link>
);
