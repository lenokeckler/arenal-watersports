import { E2E_RESERVATION_POSTPONEMENT as values } from "../constants/E2eReservationPostponement.constants";

export const buildCostaRicaTomorrow = (): string =>
  new Intl.DateTimeFormat(values.COSTA_RICA_LOCALE, {
    timeZone: values.COSTA_RICA_TIME_ZONE,
  }).format(new Date(Date.now() + values.DAY_MS));
