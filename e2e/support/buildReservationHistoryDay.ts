import type { TestInfo } from "@playwright/test";
import { RESERVATION_HISTORY_FILTER_PARAM } from "@/app/constants";
import {
  E2E_RESERVATION_HISTORY_DAY,
  E2E_RESERVATION_HISTORY_DAY_OFFSET,
} from "../constants/E2eReservationHistory.constants";
import type { E2eReservationHistoryDay } from "./models/E2eReservationHistoryDay.interface";

export const buildReservationHistoryDay = (
  { parallelIndex }: TestInfo,
  offset: number = E2E_RESERVATION_HISTORY_DAY_OFFSET.FIRST
): E2eReservationHistoryDay => {
  const day = E2E_RESERVATION_HISTORY_DAY;
  const dayIndex =
    parallelIndex * day.DAYS_PER_WORKER + offset;
  const date = new Date(
    Date.parse(`${day.BASE_DATE}${day.TIME_ORIGIN}`) +
      dayIndex * day.MS_PER_DAY
  )
    .toISOString()
    .slice(0, day.ISO_DATE_LENGTH);

  return {
    date,
    query: {
      [RESERVATION_HISTORY_FILTER_PARAM.FROM]: date,
      [RESERVATION_HISTORY_FILTER_PARAM.TO]: date,
    },
    startsAt: `${date}${day.START_TIME}`,
  };
};
