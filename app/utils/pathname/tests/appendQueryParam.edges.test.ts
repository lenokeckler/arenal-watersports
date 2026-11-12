import { describe, expect, it } from "vitest";
import { appendQueryParam } from "../appendQueryParam";
import { EDGE_CASES } from "./appendQueryParam.constants";

describe("appendQueryParam edges", () => {
  it.each(EDGE_CASES)(
    "appends to %s as %s",
    (pathname, expected) => {
      expect(
        appendQueryParam(pathname, "notice", "done")
      ).toBe(expected);
    }
  );
});
