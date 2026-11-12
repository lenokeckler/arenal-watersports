import { render } from "@testing-library/react";
import type { ComponentProps } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import SystemNavigation from "../SystemNavigation";
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

describe("SystemNavigation menu dismissal", () => {
  beforeEach(() => {
    systemNavigationMocks.pathname = PATHS.BOARD;
  });

  it("closes when navigation changes", async () => {
    const overview =
      SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA;
    const { rerender } = render(
      <SystemNavigation overview={overview} />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();
    systemNavigationMocks.pathname =
      PATHS.OPERATIONS.CALENDAR;
    rerender(<SystemNavigation overview={overview} />);

    expect(page.getMenuButton()).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(page.getMenuRegion()).not.toBeVisible();
  });

  it("closes when Escape is pressed", async () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA
        }
      />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();
    await page.pressEscape();

    expect(page.getMenuButton()).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(page.getMenuRegion()).not.toBeVisible();
  });

  it("closes when pointer is pressed outside navigation", async () => {
    render(
      <SystemNavigation
        overview={
          SYSTEM_NAVIGATION_TEST_OVERVIEW.MULTI_AREA
        }
      />
    );
    const page = createSystemNavigationPage();

    await page.openMenu();
    await page.clickOutsideNavigation();

    expect(page.getMenuButton()).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(page.getMenuRegion()).not.toBeVisible();
  });
});
