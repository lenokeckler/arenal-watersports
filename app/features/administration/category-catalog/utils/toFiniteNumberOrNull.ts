import type { NullableRef } from "@/app/types";

export const toFiniteNumberOrNull = (
  value: NullableRef<number>
): NullableRef<number> =>
  value !== null && Number.isFinite(value) ? value : null;
