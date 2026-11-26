import { describe, expect, it } from "vitest";
import { isBoardLayoutColumns } from "../isBoardLayoutColumns";
import {
  THREE_COLUMNS,
  TWO_COLUMNS,
  TWO_COLUMNS_AS_TEXT,
  UNSUPPORTED_COLUMNS,
} from "./boardLayout.constants";

describe("isBoardLayoutColumns", () => {
  it("accepts two and three", () => {
    expect(isBoardLayoutColumns(TWO_COLUMNS)).toBe(true);
    expect(isBoardLayoutColumns(THREE_COLUMNS)).toBe(true);
  });

  it("rejects any other value", () => {
    expect(isBoardLayoutColumns(UNSUPPORTED_COLUMNS)).toBe(
      false
    );
    expect(isBoardLayoutColumns(TWO_COLUMNS_AS_TEXT)).toBe(
      false
    );
    expect(isBoardLayoutColumns(null)).toBe(false);
  });
});
