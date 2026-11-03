import { describe, expect, it } from "vitest";
import { appendQueryParam } from "../appendQueryParam";
import { APPEND_CASES } from "./appendQueryParam.constants";

describe("appendQueryParam", () => {
  it.each(APPEND_CASES)(
    "appends %s %s=%s as %s",
    (pathname, name, value, expected) => {
      expect(appendQueryParam(pathname, name, value)).toBe(
        expected
      );
    }
  );
});
