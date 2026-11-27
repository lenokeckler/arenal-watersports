import { describe, expect, it } from "vitest";
import { resolveLegacyUnitId } from "../utils/resolveLegacyUnitId";

const UNIT_ID = "167885f9-536a-47e0-ba90-5e16eed7c782";

describe("resolveLegacyUnitId", () => {
  it("accepts one machine id and nothing else", () => {
    expect(resolveLegacyUnitId(UNIT_ID)).toBe(UNIT_ID);
    expect(resolveLegacyUnitId([UNIT_ID])).toBeNull();
    expect(resolveLegacyUnitId("../access")).toBeNull();
    expect(resolveLegacyUnitId(undefined)).toBeNull();
  });
});
