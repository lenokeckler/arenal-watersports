import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { buildHubCards } from "../utils/buildHubCards";

describe("buildHubCards", () => {
  it("links the three sections of the equipment", () => {
    expect(
      buildHubCards({
        jobs: [],
        months: [],
        pendingDamage: 1,
        photosMissing: 2,
        reports: [],
        waitingMaintenance: 3,
      }).map((card) => card.href)
    ).toEqual([
      PATHS.OPERATIONS.DAMAGE_REPORTS,
      PATHS.OPERATIONS.UNIT_PHOTOS_ROOT,
      PATHS.OPERATIONS.MAINTENANCE,
    ]);
  });
});
