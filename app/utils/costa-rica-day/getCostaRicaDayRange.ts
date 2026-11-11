import {
  COSTA_RICA_DAY,
  COSTA_RICA_TIME_ZONE,
  COSTA_RICA_UTC_OFFSET,
} from "@/app/constants";
import type { CostaRicaDayRange } from "./models/CostaRicaDayRange.interface";

const dateLabelFormat = new Intl.DateTimeFormat(
  COSTA_RICA_DAY.DATE_LABEL_LOCALE,
  { timeZone: COSTA_RICA_TIME_ZONE }
);

export const getCostaRicaDayRange = (
  now: Date
): CostaRicaDayRange => {
  const date = dateLabelFormat.format(now);
  const start = new Date(
    `${date}${COSTA_RICA_DAY.START_TIME}${COSTA_RICA_UTC_OFFSET}`
  );
  const end = new Date(
    start.getTime() + COSTA_RICA_DAY.LENGTH_MILLISECONDS
  );
  return {
    date,
    startsAt: start.toISOString(),
    endsAt: end.toISOString(),
  };
};
