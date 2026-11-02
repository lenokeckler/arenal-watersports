import type { ReactElement } from "react";
import { Link } from "@/app/components";
import {
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import { resolveReservationSplitPath } from "@/app/utils/reservations/resolveReservationSplitPath";
import type { ReservationCalendarBlockActionsProps } from "../models/ReservationCalendarBlockActionsProps.interface";
import { RESERVATION_CALENDAR_BLOCK_SPLIT_LINK_CLASS } from "../styles/ReservationCalendarBlockActions.styles";

export const ReservationCalendarBlockActions = ({
  block,
}: ReservationCalendarBlockActionsProps): ReactElement => (
  <Link
    ariaLabel={[
      copy.SPLIT_RESERVATION_LABEL,
      block.customerName,
    ].join(STRING.SPACE)}
    className={RESERVATION_CALENDAR_BLOCK_SPLIT_LINK_CLASS}
    href={resolveReservationSplitPath(block.id)}
  >
    {copy.SPLIT_RESERVATION}
  </Link>
);
