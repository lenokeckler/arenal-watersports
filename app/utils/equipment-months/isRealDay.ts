import {
  EQUIPMENT_PERIOD,
  ISO_DATE_PATTERN,
} from "@/app/constants";

export const isRealDay = (value: string): boolean => {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const instant = new Date(
    `${value}${EQUIPMENT_PERIOD.NOON_SUFFIX}`
  );

  return (
    !Number.isNaN(instant.getTime()) &&
    instant.toISOString().startsWith(value)
  );
};
