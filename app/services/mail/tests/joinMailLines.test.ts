import { describe, expect, it } from "vitest";
import { joinMailLines } from "../joinMailLines";
import {
  JOIN_LINES_CARRIAGE_RETURN,
  JOIN_LINES_EXPECTED,
  JOIN_LINES_SAMPLE,
  JOIN_LINES_SINGLE,
} from "./joinMailLines.constants";

describe("joinMailLines", () => {
  it("joins the lines in order with a line feed, keeping blank lines", () => {
    expect(joinMailLines(JOIN_LINES_SAMPLE)).toBe(
      JOIN_LINES_EXPECTED
    );
  });

  it("returns an empty string for no lines", () => {
    expect(joinMailLines([])).toBe("");
  });

  it("adds no separator around a single line", () => {
    expect(joinMailLines(JOIN_LINES_SINGLE)).toBe(
      JOIN_LINES_SINGLE[0]
    );
  });

  it("never emits a carriage return", () => {
    expect(joinMailLines(JOIN_LINES_SAMPLE)).not.toContain(
      JOIN_LINES_CARRIAGE_RETURN
    );
  });
});
