import { describe, expect, it } from "vitest";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import { SYSTEM_NAVIGATION_TEST_OVERVIEW } from "./SystemNavigation.constants";
import { shouldShowSystemNavigation } from "@/app/utils/work-mode/shouldShowSystemNavigation";

describe("shouldShowSystemNavigation", () => {
  it("hides navigation when the user selects an active work mode", () => {
    expect(
      shouldShowSystemNavigation(
        SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA,
        PATHS.MODE
      )
    ).toBe(false);
  });

  it("hides navigation when the current area is not granted", () => {
    expect(
      shouldShowSystemNavigation(
        SYSTEM_NAVIGATION_TEST_OVERVIEW.UNGRANTED_CURRENT,
        PATHS.BOARD
      )
    ).toBe(false);
  });

  it("shows navigation when the current area is Administration", () => {
    expect(
      shouldShowSystemNavigation(
        SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION,
        PATHS.BOARD
      )
    ).toBe(true);
  });

  it("shows navigation for a granted Operations area outside mode selection", () => {
    expect(
      shouldShowSystemNavigation(
        SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA,
        PATHS.BOARD
      )
    ).toBe(true);
  });

  it("hides navigation without an active area", () => {
    expect(
      shouldShowSystemNavigation(
        {
          areas: [SUPABASE_WORK_AREA.OPERATIONS],
          current: null,
        },
        PATHS.BOARD
      )
    ).toBe(false);
  });

  it("hides navigation when the work mode overview is unavailable", () => {
    expect(
      shouldShowSystemNavigation(null, PATHS.BOARD)
    ).toBe(false);
  });
});
