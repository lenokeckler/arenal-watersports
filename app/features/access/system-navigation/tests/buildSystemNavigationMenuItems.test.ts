import { describe, expect, it } from "vitest";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { buildSystemNavigationMenuItems } from "../utils/buildSystemNavigationMenuItems";

describe("buildSystemNavigationMenuItems", () => {
  it("lists Combos for Administration", () => {
    expect(
      buildSystemNavigationMenuItems(
        SUPABASE_WORK_AREA.ADMINISTRATION
      )
    ).toEqual([
      {
        label: SYSTEM_NAVIGATION_COPY.COMBOS,
        href: PATHS.ADMINISTRATION.COMBOS,
      },
    ]);
  });

  it.each([
    SUPABASE_WORK_AREA.OPERATIONS,
    SUPABASE_WORK_AREA.RESERVATIONS,
  ])("lists nothing for %s", (area) => {
    expect(buildSystemNavigationMenuItems(area)).toEqual(
      []
    );
  });
});
