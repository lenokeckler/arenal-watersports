import { describe, expect, it } from "vitest";
import {
  SupabaseNoRowsAffectedError,
  throwIfNoRowsAffected,
} from "../SupabaseNoRowsAffectedError";
import {
  NO_ROWS,
  ONE_ROW,
  OPERATION,
  TWO_ROWS,
} from "./SupabaseNoRowsAffectedError.constants";

describe("throwIfNoRowsAffected", () => {
  it("throws a SupabaseNoRowsAffectedError when no row was changed", () => {
    expect(() =>
      throwIfNoRowsAffected(NO_ROWS, OPERATION)
    ).toThrow(SupabaseNoRowsAffectedError);
  });

  it("names the operation in the message", () => {
    expect(() =>
      throwIfNoRowsAffected(NO_ROWS, OPERATION)
    ).toThrow(
      `Supabase write changed no row: ${OPERATION}`
    );
  });

  it("names the error class", () => {
    expect(
      new SupabaseNoRowsAffectedError(OPERATION).name
    ).toBe("SupabaseNoRowsAffectedError");
  });

  it("does not throw when one row was changed", () => {
    expect(() =>
      throwIfNoRowsAffected(ONE_ROW, OPERATION)
    ).not.toThrow();
  });

  it("does not throw when several rows were changed", () => {
    expect(() =>
      throwIfNoRowsAffected(TWO_ROWS, OPERATION)
    ).not.toThrow();
  });
});
