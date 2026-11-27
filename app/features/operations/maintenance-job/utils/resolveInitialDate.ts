import { ISO_DATE_PATTERN } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";

export const resolveInitialDate = (
  requested: NullableUndefined<string>,
  today: string
): string =>
  requested &&
  ISO_DATE_PATTERN.test(requested) &&
  requested <= today
    ? requested
    : today;
