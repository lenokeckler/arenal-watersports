import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_CURRENT, PATHS } from "@/app/constants";
import SystemNavigation from "../SystemNavigation";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import { createSystemNavigationPage } from "./SystemNavigation.page";
import { SYSTEM_NAVIGATION_TEST_OVERVIEW } from "./SystemNavigation.constants";

const systemNavigationMocks = vi.hoisted(() => ({
  pathname: "",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => systemNavigationMocks.pathname,
}));

describe("SystemNavigation visibility", () => {
  beforeEach(() => {
    systemNavigationMocks.pathname = PATHS.BOARD;
  });

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

  it("hides the navigation on the mode selection path", () => {
    systemNavigationMocks.pathname = PATHS.MODE;
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA
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
});
