import { describe, expect, it } from "vitest";
import { parseFuelInput } from "../utils/parseFuelInput";
import { parseUsageInput } from "../utils/parseUsageInput";
import { DISPATCH_FIXTURE_GAUGE } from "./DispatchSheetGroup.fixtures";

describe("parseFuelInput", () => {
  it.each([
    ["0", 0],
    ["3", 3],
    [" 4 ", 4],
  ])("reads %j as %i lines", (text, expected) => {
    expect(
      parseFuelInput(text, DISPATCH_FIXTURE_GAUGE.MAX)
    ).toBe(expected);
  });

  it.each(["", "5", "-1", "2.5", "1,5", "tres", "3 4"])(
    "refuses %j",
    (text) => {
      expect(
        parseFuelInput(text, DISPATCH_FIXTURE_GAUGE.MAX)
      ).toBeNull();
    }
  );
});

describe("parseUsageInput", () => {
  it.each([
    ["0", 0],
    ["12", 12],
    ["12.5", 12.5],
    ["12,5", 12.5],
    ["12.25", 12.25],
    [" 7 ", 7],
  ])("reads %j as %d", (text, expected) => {
    expect(parseUsageInput(text)).toBe(expected);
  });

  it.each([
    "",
    "-1",
    "1.005",
    "1e3",
    "abc",
    "1..5",
    "100000000000",
  ])("refuses %j", (text) => {
    expect(parseUsageInput(text)).toBeNull();
  });
});
