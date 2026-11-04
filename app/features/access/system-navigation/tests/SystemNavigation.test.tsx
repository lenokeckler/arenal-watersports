import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  ARIA_CURRENT,
  MATERIAL_ICON_NAME,
  PATHS,
} from "@/app/constants";
import SystemNavigation from "../SystemNavigation";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { createSystemNavigationPage } from "./SystemNavigation.page";
import { SYSTEM_NAVIGATION_TEST_OVERVIEW } from "./SystemNavigation.constants";
import { SYSTEM_NAVIGATION_TEST_PATHNAME } from "./SystemNavigation.constants";

vi.mock("next/navigation", () => ({
  usePathname: () => PATHS.BOARD,
}));

describe("SystemNavigation", () => {
  it("hides the navigation in Administration mode", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
        }
      />
    );

    expect(
      createSystemNavigationPage().queryNavigation()
    ).toBeNull();
  });

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

  it("shows Operations destinations", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA
        }
      />
    );
    const page = createSystemNavigationPage();

    expect(
      page.getLastNavigationLink(
        SYSTEM_NAVIGATION_COPY.BOARD
      )
    ).toHaveAttribute("href", PATHS.BOARD);
    expect(
      page.getLastNavigationLink(
        SYSTEM_NAVIGATION_COPY.BOARD
      )
    ).toHaveAttribute("aria-current", ARIA_CURRENT.PAGE);
    expect(
      page.getNavigationLink(
        SYSTEM_NAVIGATION_COPY.CALENDAR
      )
    ).toHaveAttribute("href", PATHS.OPERATIONS.CALENDAR);
    expect(
      page.getNavigationLink(
        SYSTEM_NAVIGATION_COPY.INVENTORY
      )
    ).toHaveAttribute("href", PATHS.OPERATIONS.INVENTORY);
    expect(
      page.getNavigationLink(SYSTEM_NAVIGATION_COPY.HISTORY)
    ).toHaveAttribute("href", PATHS.HISTORY.ROOT);
  });

  it("shows Reservations calendar and hides Inventory", () => {
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
      page.getNavigationLink(SYSTEM_NAVIGATION_COPY.HISTORY)
    ).toHaveAttribute("href", PATHS.HISTORY.ROOT);
    expect(
      page.queryNavigationLink(
        SYSTEM_NAVIGATION_COPY.INVENTORY
      )
    ).toBeNull();
  });

  it("marks nested routes current without matching similar route prefixes", () => {
    const page = createSystemNavigationPage();
    const item = {
      label: SYSTEM_NAVIGATION_COPY.BOARD,
      href: PATHS.BOARD,
      icon: MATERIAL_ICON_NAME.DASHBOARD,
    };

    page.renderItem({
      item,
      pathname:
        SYSTEM_NAVIGATION_TEST_PATHNAME.BOARD_CATEGORY,
    });
    expect(
      page.getLastNavigationLink(
        SYSTEM_NAVIGATION_COPY.BOARD
      )
    ).toHaveAttribute("aria-current", ARIA_CURRENT.PAGE);

    page.renderItem({
      item,
      pathname:
        SYSTEM_NAVIGATION_TEST_PATHNAME.BOARD_SIMILAR_PREFIX,
    });
    expect(
      page.getLastNavigationLink(
        SYSTEM_NAVIGATION_COPY.BOARD
      )
    ).not.toHaveAttribute(
      "aria-current",
      ARIA_CURRENT.PAGE
    );
  });
});
