import {
  RESERVATION_CALENDAR_ACTIVE_STATUS,
  RESERVATION_HISTORY_STATUS,
  RESERVATIONS_CALENDAR_COPY as copy,
} from "@/app/constants";
import { resolveReservationEditPath } from "@/app/utils/reservations/resolveReservationEditPath";
import { resolveReservationPostponePath } from "@/app/utils/reservations/resolveReservationPostponePath";
import { resolveReservationSplitPath } from "@/app/utils/reservations/resolveReservationSplitPath";
import type { ReservationCalendarBlock } from "@/app/components/reservation-calendar/models/ReservationCalendarBlock.interface";
import type { ReservationCalendarBlockActionLink } from "../models/ReservationCalendarBlockActionLink.interface";

const MODIFY: ReservationCalendarBlockActionLink = {
  ariaLabel: copy.MODIFY_RESERVATION_LABEL,
  key: "modify",
  resolvePath: resolveReservationEditPath,
  text: copy.MODIFY_RESERVATION,
};

const SPLIT: ReservationCalendarBlockActionLink = {
  ariaLabel: copy.SPLIT_RESERVATION_LABEL,
  key: "split",
  resolvePath: resolveReservationSplitPath,
  text: copy.SPLIT_RESERVATION,
};

const POSTPONE: ReservationCalendarBlockActionLink = {
  ariaLabel: copy.POSTPONE_RESERVATION_LABEL,
  key: "postpone",
  resolvePath: resolveReservationPostponePath,
  text: copy.POSTPONE_RESERVATION,
};

export const RESERVATION_CALENDAR_BLOCK_ACTION_LINKS: Record<
  ReservationCalendarBlock["status"],
  readonly ReservationCalendarBlockActionLink[]
> = {
  [RESERVATION_HISTORY_STATUS.CANCELLED]: [],
  [RESERVATION_HISTORY_STATUS.CLOSED]: [],
  [RESERVATION_CALENDAR_ACTIVE_STATUS.DISPATCHED]: [
    POSTPONE,
  ],
  [RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED]: [
    MODIFY,
    SPLIT,
    POSTPONE,
  ],
};
