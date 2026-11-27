import { describe, expect, it } from "vitest";
import { readCompatibleUnitCount } from "../utils/readCompatibleUnitCount";
import { FAKE_EXTRA_COMPATIBLE_UNIT_COUNT } from "./Extra.constants";

describe("readCompatibleUnitCount", () => {
  it("reads the count of the aggregate row", () => {
    expect(
      readCompatibleUnitCount([
        { count: FAKE_EXTRA_COMPATIBLE_UNIT_COUNT },
      ])
    ).toBe(FAKE_EXTRA_COMPATIBLE_UNIT_COUNT);
  });

  it("is zero when the embed returns no aggregate row", () => {
    expect(readCompatibleUnitCount([])).toBe(0);
  });
});
