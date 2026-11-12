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

  it("shows the navigation in Administration mode", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
        }
      />
    );

    expect(
      createSystemNavigationPage().queryNavigation()
    ).not.toBeNull();
  });

  it("shows the five Administration destinations in order", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
        }
      />
    );
    const navigationPage = createSystemNavigationPage();
    const navigationLinks =
      navigationPage.getNavigationLinks();
    const expectedDestinations = [
      [
        SYSTEM_NAVIGATION_COPY.INVENTORY,
        PATHS.ADMINISTRATION.CATEGORIES,
      ],
      [
        SYSTEM_NAVIGATION_COPY.EXTRAS,
        PATHS.ADMINISTRATION.EXTRAS,
      ],
      [
        SYSTEM_NAVIGATION_COPY.WORKERS,
        PATHS.ADMINISTRATION.WORKER_AREAS,
      ],
      [
        SYSTEM_NAVIGATION_COPY.INCOME,
        PATHS.ADMINISTRATION.INCOME,
      ],
      [
        SYSTEM_NAVIGATION_COPY.REPORTS,
        PATHS.ADMINISTRATION.DEPOSITS,
      ],
    ] as const;

    expect(navigationLinks).toHaveLength(
      expectedDestinations.length
    );
    expectedDestinations.forEach(([label, href], index) => {
      expect(navigationLinks[index]).toHaveAccessibleName(
        label
      );
      expect(navigationLinks[index]).toHaveAttribute(
        "href",
        href
      );
    });
  });

  it("does not show the account Menu button in Administration mode", () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
        }
      />
    );

    expect(
      createSystemNavigationPage().queryMenuButton()
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
