import { createElement } from "react";
import { RESERVATION_CALENDAR_ACTIVE_STATUS } from "@/app/constants";
import type { ReservationCalendarBlockActionsRenderer } from "@/app/components/reservation-calendar/models/ReservationCalendarBlockActionsRenderer.type";
import { ReservationCalendarBlockActions } from "../components/ReservationCalendarBlockActions";

export const renderReservationCalendarBlockActions: ReservationCalendarBlockActionsRenderer =
  (block) =>
    block.status ===
    RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED
      ? createElement(ReservationCalendarBlockActions, {
          block,
        })
      : null;
