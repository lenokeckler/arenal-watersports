import { describe, expect, it } from "vitest";
import { resolveInitialUnitId } from "../utils/resolveInitialUnitId";

describe("resolveInitialUnitId", () => {
  it("takes the first machine of the address", () => {
    expect(resolveInitialUnitId(["a", "b"])).toBe("a");
    expect(resolveInitialUnitId("c")).toBe("c");
    expect(resolveInitialUnitId(undefined)).toBeUndefined();
  });
});
