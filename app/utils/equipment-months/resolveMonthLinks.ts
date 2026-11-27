import type { NullableRef } from "@/app/types";
import { shiftMonthKey } from "./listRecentMonths";
import type { MonthLinks } from "./models/MonthLinks.interface";
import type { MonthLinksRequest } from "./models/MonthLinksRequest.interface";

export const resolveMonthLinks = ({
  month,
  months,
  toHref,
}: MonthLinksRequest): MonthLinks => {
  const linkTo = (offset: number): NullableRef<string> => {
    const target = shiftMonthKey(month, offset);

    return months.includes(target) ? toHref(target) : null;
  };

  return { nextHref: linkTo(1), previousHref: linkTo(-1) };
};
