import type { ReactElement } from "react";
import { Link } from "@/app/components";
import { STRING } from "@/app/constants";
import type { ReservationCalendarBlockActionsProps } from "../models/ReservationCalendarBlockActionsProps.interface";
import {
  RESERVATION_CALENDAR_BLOCK_ACTION_LINK_CLASS,
  RESERVATION_CALENDAR_BLOCK_ACTIONS_ROW_CLASS,
} from "../styles/ReservationCalendarBlockActions.styles";

export const ReservationCalendarBlockActions = ({
  block,
  links,
}: ReservationCalendarBlockActionsProps): ReactElement => (
  <div
    className={RESERVATION_CALENDAR_BLOCK_ACTIONS_ROW_CLASS}
  >
    {links.map((link) => (
      <Link
        key={link.key}
        ariaLabel={[
          link.ariaLabel,
          block.customerName,
        ].join(STRING.SPACE)}
        className={
          RESERVATION_CALENDAR_BLOCK_ACTION_LINK_CLASS
        }
        href={link.resolvePath(block.id)}
      >
        {link.text}
      </Link>
    ))}
  </div>
);
