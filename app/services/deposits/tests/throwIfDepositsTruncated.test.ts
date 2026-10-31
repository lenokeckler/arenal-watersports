import { describe, expect, it } from "vitest";
import { DepositsTruncatedError } from "../DepositsTruncatedError";
import { throwIfDepositsTruncated } from "../throwIfDepositsTruncated";
import {
  TRUNCATED_ROW_COUNT,
  TRUNCATED_TOTAL_COUNT,
} from "./Deposits.constants";

describe("throwIfDepositsTruncated", () => {
  it("passes when the rows equal the total count", () => {
    expect(() =>
      throwIfDepositsTruncated(
        TRUNCATED_TOTAL_COUNT,
        TRUNCATED_TOTAL_COUNT
      )
    ).not.toThrow();
  });

  it("passes when there are no rows and the total is zero", () => {
    expect(() =>
      throwIfDepositsTruncated(0, 0)
    ).not.toThrow();
  });

  it("throws when there are fewer rows than the total count", () => {
    expect(() =>
      throwIfDepositsTruncated(
        TRUNCATED_ROW_COUNT,
        TRUNCATED_TOTAL_COUNT
      )
    ).toThrow(DepositsTruncatedError);
  });

  it("throws when the total count is null", () => {
    expect(() =>
      throwIfDepositsTruncated(TRUNCATED_ROW_COUNT, null)
    ).toThrow(DepositsTruncatedError);
  });
});
