import type { NullableRef } from "@/app/types";
import { DepositsTruncatedError } from "./DepositsTruncatedError";

export const throwIfDepositsTruncated = (
  rowCount: number,
  totalCount: NullableRef<number>
): void => {
  if (totalCount === null || rowCount < totalCount) {
    throw new DepositsTruncatedError();
  }
};
