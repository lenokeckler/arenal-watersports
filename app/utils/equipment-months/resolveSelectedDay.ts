import { EQUIPMENT_PERIOD } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { isString } from "@/app/utils/type-guards/isString";
import { isRealDay } from "./isRealDay";
import type { SelectedDayRequest } from "./models/SelectedDayRequest.interface";

const findLatestDay = (
  month: string,
  entryDates: string[]
): NullableUndefined<string> =>
  entryDates
    .filter((date) => date.startsWith(month))
    .sort()
    .at(-1);

export const resolveSelectedDay = ({
  entryDates,
  month,
  requested,
  today,
}: SelectedDayRequest): string => {
  if (
    isString(requested) &&
    requested.startsWith(`${month}-`) &&
    isRealDay(requested) &&
    requested <= today
  ) {
    return requested;
  }

  if (today.startsWith(month)) {
    return today;
  }

  return (
    findLatestDay(month, entryDates) ??
    `${month}${EQUIPMENT_PERIOD.FIRST_DAY_SUFFIX}`
  );
};
