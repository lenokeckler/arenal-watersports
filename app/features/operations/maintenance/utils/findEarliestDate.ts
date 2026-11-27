import type { NullableRef } from "@/app/types";

export const findEarliestDate = (
  dates: NullableRef<string>[]
): NullableRef<string> =>
  dates.filter((date) => date !== null).sort()[0] ?? null;
