import { INCOME_DATE_FORMAT } from "../constants/Income.constants";

const incomeDateFormat = new Intl.DateTimeFormat(
  INCOME_DATE_FORMAT.LOCALE,
  INCOME_DATE_FORMAT.OPTIONS
);

export const formatIncomeDate = (date: string): string =>
  incomeDateFormat.format(
    new Date(`${date}${INCOME_DATE_FORMAT.NOON_UTC_TIME}`)
  );
