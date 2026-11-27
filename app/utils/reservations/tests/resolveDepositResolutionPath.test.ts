import { describe, expect, it } from "vitest";
import { resolveDepositResolutionPath } from "../resolveDepositResolutionPath";

const DEPOSIT_ID = "e2b10000-0000-4000-8000-000000000901";

describe("resolveDepositResolutionPath", () => {
  it("builds the resolution path of one deposit", () => {
    expect(resolveDepositResolutionPath(DEPOSIT_ID)).toBe(
      `/reservations/deposits/${DEPOSIT_ID}/resolve`
    );
  });
});
