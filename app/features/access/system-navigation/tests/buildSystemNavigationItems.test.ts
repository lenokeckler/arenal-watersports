import { describe, expect, it } from "vitest";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import { buildSystemNavigationItems } from "../utils/buildSystemNavigationItems";

describe("buildSystemNavigationItems", () => {
  it("includes Inventory only for Operations", () => {
    const operationsItems = buildSystemNavigationItems(
      SUPABASE_WORK_AREA.OPERATIONS
    );
    const reservationsItems = buildSystemNavigationItems(
      SUPABASE_WORK_AREA.RESERVATIONS
    );

    expect(operationsItems.map(({ href }) => href)).toEqual(
      [
        PATHS.BOARD,
        PATHS.OPERATIONS.CALENDAR,
        PATHS.OPERATIONS.INVENTORY,
        PATHS.HISTORY.ROOT,
      ]
    );
    expect(
      reservationsItems.map(({ href }) => href)
    ).toEqual([
      PATHS.BOARD,
      PATHS.RESERVATIONS.CALENDAR,
      PATHS.HISTORY.ROOT,
    ]);
  });
});
