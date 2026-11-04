import { describe, expect, it } from "vitest";
import { ChargesTruncatedError } from "@/app/services/income/ChargesTruncatedError";
import { RefundsTruncatedError } from "@/app/services/income/RefundsTruncatedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { isIncomeReadFailure } from "../isIncomeReadFailure";
import {
  NON_ERROR_VALUES,
  POSTGREST_ERROR,
  QUERY_OPERATION,
  UNEXPECTED_MESSAGE,
} from "./IncomeReport.constants";

describe("isIncomeReadFailure", () => {
  it("is true for a SupabaseQueryError", () => {
    expect(
      isIncomeReadFailure(
        new SupabaseQueryError(
          QUERY_OPERATION,
          POSTGREST_ERROR
        )
      )
    ).toBe(true);
  });

  it("is true for a ChargesTruncatedError", () => {
    expect(
      isIncomeReadFailure(new ChargesTruncatedError())
    ).toBe(true);
  });

  it("is true for a RefundsTruncatedError", () => {
    expect(
      isIncomeReadFailure(new RefundsTruncatedError())
    ).toBe(true);
  });

  it("is false for a plain Error", () => {
    expect(
      isIncomeReadFailure(new Error(UNEXPECTED_MESSAGE))
    ).toBe(false);
  });

  it.each(NON_ERROR_VALUES)(
    "is false for the non-Error value %p",
    (value) => {
      expect(isIncomeReadFailure(value)).toBe(false);
    }
  );
});
