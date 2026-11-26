import { CATEGORY_UNIT_RETURN_DATE_FORMAT } from "../constants/CategoryUnits.constants";

const DATE_ONLY_LENGTH = 10;
const NOON_SUFFIX = "T12:00:00Z";

export const formatStatusDate = (value: string): string => {
  const instant = new Date(
    value.length === DATE_ONLY_LENGTH
      ? `${value}${NOON_SUFFIX}`
      : value
  );

  return new Intl.DateTimeFormat(
    CATEGORY_UNIT_RETURN_DATE_FORMAT.LOCALE,
    CATEGORY_UNIT_RETURN_DATE_FORMAT.OPTIONS
  ).format(instant);
};
