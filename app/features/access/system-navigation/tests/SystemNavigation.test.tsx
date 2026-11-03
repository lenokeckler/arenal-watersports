import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ARIA_CURRENT, PATHS } from "@/app/constants";
import SystemNavigation from "../SystemNavigation";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { createSystemNavigationPage } from "./SystemNavigation.page";
import { SYSTEM_NAVIGATION_TEST_OVERVIEW } from "./SystemNavigation.constants";

vi.mock("next/navigation", () => ({
  usePathname: () => PATHS.BOARD,
}));

describe("SystemNavigation", () => {
  it("does not expose a mode missing from granted areas", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.UNGRANTED_CURRENT
        }
      />
    );

    expect(
      createSystemNavigationPage().queryNavigation()
    ).toBeNull();
  });

  it("shows Operations links and pending destinations without hrefs", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA
        }
      />
    );
    const page = createSystemNavigationPage();

    expect(
      page.getNavigationLink(SYSTEM_NAVIGATION_COPY.BOARD)
    ).toHaveAttribute("aria-current", ARIA_CURRENT.PAGE);
    expect(
      page.getNavigationLink(
        SYSTEM_NAVIGATION_COPY.CALENDAR
      )
    ).toHaveAttribute("href", PATHS.OPERATIONS.CALENDAR);
    expect(
      page.getPendingButton(
        SYSTEM_NAVIGATION_COPY.INVENTORY
      )
    ).toBeDisabled();
    expect(
      page.getPendingButton(SYSTEM_NAVIGATION_COPY.HISTORY)
    ).toBeDisabled();
  });

  it("shows Income and Reservations calendar links in Reservations mode", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.RESERVATIONS
        }
      />
    );
    const page = createSystemNavigationPage();

    expect(
      page.getNavigationLink(
        SYSTEM_NAVIGATION_COPY.CALENDAR
      )
    ).toHaveAttribute("href", PATHS.RESERVATIONS.CALENDAR);
    expect(
      page.getNavigationLink(SYSTEM_NAVIGATION_COPY.INCOME)
    ).toHaveAttribute("href", PATHS.RESERVATIONS.INCOME);
    expect(
      page.queryPendingButton(
        SYSTEM_NAVIGATION_COPY.INVENTORY
      )
    ).toBeNull();
  });
});
