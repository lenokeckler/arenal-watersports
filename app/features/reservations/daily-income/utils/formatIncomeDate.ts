import { DAILY_INCOME_DATE_FORMAT } from "../constants/DailyIncome.constants";

const incomeDateFormat = new Intl.DateTimeFormat(
  DAILY_INCOME_DATE_FORMAT.LOCALE,
  DAILY_INCOME_DATE_FORMAT.OPTIONS
);

export const formatIncomeDate = (date: string): string =>
  incomeDateFormat.format(
    new Date(
      `${date}${DAILY_INCOME_DATE_FORMAT.NOON_UTC_TIME}`
    )
  );
