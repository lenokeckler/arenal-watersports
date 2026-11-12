import type { NullableRef } from "@/app/types";

export const requireUnitNumber = (
  value: NullableRef<number>,
  failureMessage: string
): number => {
  if (value === null) {
    throw new Error(failureMessage);
  }

  return value;
};
