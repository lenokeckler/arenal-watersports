import { describe, expect, it } from "vitest";
import { SUPABASE_WORK_AREA } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import {
  SYSTEM_NAVIGATION_CHANGE_MODE_DESTINATION,
  SYSTEM_NAVIGATION_MENU_SECTIONS,
  SYSTEM_NAVIGATION_PROFILE_DESTINATION,
} from "../constants/SystemNavigationMenuSections.constants";
import { buildSystemNavigationMenuSections } from "../utils/buildSystemNavigationMenuSections";

const ACCOUNT_WITH_MODE = {
  label: SYSTEM_NAVIGATION_COPY.ACCOUNT_SECTION,
  destinations: [
    SYSTEM_NAVIGATION_PROFILE_DESTINATION,
    SYSTEM_NAVIGATION_CHANGE_MODE_DESTINATION,
  ],
};

const ACCOUNT_WITHOUT_MODE = {
  label: SYSTEM_NAVIGATION_COPY.ACCOUNT_SECTION,
  destinations: [SYSTEM_NAVIGATION_PROFILE_DESTINATION],
};

describe("buildSystemNavigationMenuSections", () => {
  it("puts Precios with Tarifas then Combos before Cuenta for Administration", () => {
    const sections = buildSystemNavigationMenuSections(
      SUPABASE_WORK_AREA.ADMINISTRATION,
      true
    );

    expect(sections).toEqual([
      ...SYSTEM_NAVIGATION_MENU_SECTIONS[
        SUPABASE_WORK_AREA.ADMINISTRATION
      ],
      ACCOUNT_WITH_MODE,
    ]);
    expect(
      sections[0].destinations.map(({ label }) => label)
    ).toEqual([
      SYSTEM_NAVIGATION_COPY.TARIFFS,
      SYSTEM_NAVIGATION_COPY.COMBOS,
    ]);
  });

  it.each([
    SUPABASE_WORK_AREA.OPERATIONS,
    SUPABASE_WORK_AREA.RESERVATIONS,
  ])("lists only Cuenta for %s", (area) => {
    expect(
      buildSystemNavigationMenuSections(area, false)
    ).toEqual([ACCOUNT_WITHOUT_MODE]);
  });
});
