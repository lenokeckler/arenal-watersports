import { createElement } from "react";
import { RESERVATION_CALENDAR_ACTIVE_STATUS } from "@/app/constants";
import type { ReservationCalendarBlockActionsRenderer } from "@/app/components/reservation-calendar/models/ReservationCalendarBlockActionsRenderer.type";
import { ReservationCalendarBlockActions } from "../components/ReservationCalendarBlockActions";
import { ReservationCalendarDispatchedBlockActions } from "../components/ReservationCalendarDispatchedBlockActions";

const BLOCK_ACTIONS_BY_STATUS = {
  [RESERVATION_CALENDAR_ACTIVE_STATUS.DISPATCHED]:
    ReservationCalendarDispatchedBlockActions,
  [RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED]:
    ReservationCalendarBlockActions,
} as const;

const isActiveStatus = (
  status: string
): status is keyof typeof BLOCK_ACTIONS_BY_STATUS =>
  Object.hasOwn(BLOCK_ACTIONS_BY_STATUS, status);

export const renderReservationCalendarBlockActions: ReservationCalendarBlockActionsRenderer =
  (block) =>
    isActiveStatus(block.status)
      ? createElement(
          BLOCK_ACTIONS_BY_STATUS[block.status],
          {
            block,
          }
        )
      : null;
