import { COSTA_RICA_DAY } from "@/app/constants";

const timeLabelFormat = new Intl.DateTimeFormat(
  COSTA_RICA_DAY.DATE_LABEL_LOCALE,
  COSTA_RICA_DAY.TIME_LABEL_OPTIONS
);

export const getCostaRicaTime = (instant: Date): string =>
  timeLabelFormat.format(instant);
