import type { JSX } from "react";
import Link from "@/app/components/link/Link";
import {
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationCalendarBlockEntryProps } from "../models/ReservationCalendarBlockEntryProps.interface";
import {
  RESERVATION_CALENDAR_BLOCK_ACTIONS_CLASS,
  RESERVATION_CALENDAR_BLOCK_ENTRY_CLASS,
  RESERVATION_CALENDAR_BLOCK_LINK_CLASS,
} from "../styles/ReservationCalendar.styles";
import { ReservationCalendarBlock } from "./ReservationCalendarBlock";

export const ReservationCalendarBlockEntry = ({
  actions,
  enableDetailLink = false,
  ...blockProps
}: ReservationCalendarBlockEntryProps): JSX.Element => {
  const { block } = blockProps;
  const reservationBlock = (
    <ReservationCalendarBlock {...blockProps} />
  );
  const entry = enableDetailLink ? (
    <Link
      href={PATHS.RESERVATIONS.DETAIL(block.id)}
      ariaLabel={`${RESERVATIONS_CALENDAR_COPY.OPEN_RESERVATION_DETAIL} ${block.customerName}`}
      className={RESERVATION_CALENDAR_BLOCK_LINK_CLASS}
    >
      {reservationBlock}
    </Link>
  ) : (
    reservationBlock
  );

  if (!actions) {
    return entry;
  }

  return (
    <div className={RESERVATION_CALENDAR_BLOCK_ENTRY_CLASS}>
      {entry}
      <div
        className={RESERVATION_CALENDAR_BLOCK_ACTIONS_CLASS}
      >
        {actions}
      </div>
    </div>
  );
};
