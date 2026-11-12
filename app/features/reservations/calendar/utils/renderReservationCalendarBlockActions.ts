import { createElement } from "react";
import type { ReservationCalendarBlockActionsRenderer } from "@/app/components/reservation-calendar/models/ReservationCalendarBlockActionsRenderer.type";
import { ReservationCalendarBlockActions } from "../components/ReservationCalendarBlockActions";
import { RESERVATION_CALENDAR_BLOCK_ACTION_LINKS } from "../constants/ReservationCalendarBlockActionLinks.constants";

export const renderReservationCalendarBlockActions: ReservationCalendarBlockActionsRenderer =
  (block) => {
    const links =
      RESERVATION_CALENDAR_BLOCK_ACTION_LINKS[block.status];

    return links.length > 0
      ? createElement(ReservationCalendarBlockActions, {
          block,
          links,
        })
      : null;
  };
