import { RESERVATION_CALENDAR_QUERY } from "@/app/constants";
import type { ReservationCalendarRefreshSequenceController } from "../models/ReservationCalendarRefreshSequenceController.interface";

export const createReservationCalendarRefreshSequence =
  (): ReservationCalendarRefreshSequenceController => {
    let currentSequence =
      RESERVATION_CALENDAR_QUERY.INITIAL_REQUEST_SEQUENCE;
    const invalidate = (): void => {
      currentSequence +=
        RESERVATION_CALENDAR_QUERY.REQUEST_SEQUENCE_INCREMENT;
    };
    const next = (): number => {
      currentSequence +=
        RESERVATION_CALENDAR_QUERY.REQUEST_SEQUENCE_INCREMENT;
      return currentSequence;
    };
    const isCurrent = (sequence: number): boolean =>
      currentSequence === sequence;
    return { invalidate, isCurrent, next };
  };
