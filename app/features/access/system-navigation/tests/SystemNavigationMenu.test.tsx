import { render } from "@testing-library/react";
import type { ComponentProps } from "react";
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
import { SYSTEM_NAVIGATION_MENU_ID } from "../constants/SystemNavigationMenu.constants";
import { SYSTEM_NAVIGATION_TEST_OVERVIEW } from "./SystemNavigation.constants";
import { createSystemNavigationPage } from "./SystemNavigation.page";

const systemNavigationMocks = vi.hoisted(() => ({
  pathname: "",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => systemNavigationMocks.pathname,
}));

vi.mock("next/link", async () => {
  const { createElement } = await import("react");

  return {
    default: ({
      href,
      onClick,
      ...props
    }: ComponentProps<"a">) =>
      createElement(
        "a",
        {
          ...props,
          href,
          onClick: (event) => {
            event.preventDefault();
            onClick?.(event);
          },
        },
        props.children
      ),
  };
});

describe("SystemNavigation menu", () => {
  beforeEach(() => {
    systemNavigationMocks.pathname = PATHS.BOARD;
  });

  it("shows existing paths and closes after navigation", async () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA
        }
      />
    );
    const page = createSystemNavigationPage();

    expect(page.getMenuButton()).toHaveAttribute(
      "aria-controls",
      SYSTEM_NAVIGATION_MENU_ID
    );
    expect(page.getMenuRegion()).not.toBeVisible();
    await page.openMenu();

    expect(
      page.getMenuLink(SYSTEM_NAVIGATION_COPY.PROFILE)
    ).toHaveAttribute("href", PATHS.PROFILE.ROOT);
    expect(
      page.getMenuLink(SYSTEM_NAVIGATION_COPY.CHANGE_MODE)
    ).toHaveAttribute("href", PATHS.MODE);
    await page.followMenuLink(
      SYSTEM_NAVIGATION_COPY.PROFILE
    );

    expect(page.getMenuButton()).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(page.getMenuRegion()).not.toBeVisible();
  });

  it("lists Combos in Administration and closes after navigation", async () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
        }
      />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();

    expect(
      page.getMenuLink(SYSTEM_NAVIGATION_COPY.COMBOS)
    ).toHaveAttribute("href", PATHS.ADMINISTRATION.COMBOS);
    await page.followMenuLink(
      SYSTEM_NAVIGATION_COPY.COMBOS
    );

    expect(page.getMenuRegion()).not.toBeVisible();
  });

  it("lists Tarifas in Administration and closes after navigation", async () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
        }
      />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();

    expect(
      page.getMenuLink(SYSTEM_NAVIGATION_COPY.TARIFFS)
    ).toHaveAttribute("href", PATHS.ADMINISTRATION.TARIFFS);
    await page.followMenuLink(
      SYSTEM_NAVIGATION_COPY.TARIFFS
    );

    expect(page.getMenuRegion()).not.toBeVisible();
  });

  it("does not list Combos outside Administration", async () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.OPERATIONS
        }
      />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();

    expect(
      page.queryMenuLink(SYSTEM_NAVIGATION_COPY.COMBOS)
    ).toBeNull();
    expect(
      page.queryMenuLink(SYSTEM_NAVIGATION_COPY.TARIFFS)
    ).toBeNull();
  });

  it("hides Change mode for a single-area account", async () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.OPERATIONS
        }
      />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();

    expect(
      page.queryMenuLink(SYSTEM_NAVIGATION_COPY.CHANGE_MODE)
    ).toBeNull();
    expect(
      page.getMenuLink(SYSTEM_NAVIGATION_COPY.PROFILE)
    ).toHaveAttribute("href", PATHS.PROFILE.ROOT);
  });

  it("marks the open screen as the current menu link", async () => {
    systemNavigationMocks.pathname =
      PATHS.ADMINISTRATION.TARIFFS;
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.ADMINISTRATION
        }
      />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();

    expect(
      page.getMenuLink(SYSTEM_NAVIGATION_COPY.TARIFFS)
    ).toHaveAttribute("aria-current", ARIA_CURRENT.PAGE);
    expect(
      page.getMenuLink(SYSTEM_NAVIGATION_COPY.COMBOS)
    ).not.toHaveAttribute("aria-current");
  });
});
