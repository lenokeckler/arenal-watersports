import type { NullableRef } from "@/app/types";
import { INDEX } from "@/app/constants";

export const resolveCustomComboAgreedAmount = (
  value: NullableRef<number>
): NullableRef<number> =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value >= INDEX.ZERO
    ? value
    : null;
