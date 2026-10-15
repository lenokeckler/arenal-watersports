import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import type { ReservationCalendarContent } from "../models/ReservationCalendarContent.interface";

export const getReservationCalendarMessages = (
  content: ReservationCalendarContent
): string[] => {
  const messages: string[] = [];
  if (!content.hasSnapshot) {
    messages.push(
      RESERVATIONS_CALENDAR_COPY.MISSING_SNAPSHOT
    );
  }
  if (content.hasSnapshot && !content.coversPeriod) {
    messages.push(
      RESERVATIONS_CALENDAR_COPY.PARTIAL_COVERAGE
    );
  }
  if (content.hasSnapshot && !content.hasAllResults) {
    messages.push(
      RESERVATIONS_CALENDAR_COPY.INCOMPLETE_RESULTS
    );
  }
  if (
    content.hasSnapshot &&
    content.coversPeriod &&
    content.hasAllResults &&
    content.groups.length === 0
  ) {
    messages.push(RESERVATIONS_CALENDAR_COPY.EMPTY_PERIOD);
  }
  return messages;
};
