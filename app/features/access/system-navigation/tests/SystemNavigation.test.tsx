import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ARIA_CURRENT,
  MATERIAL_ICON_NAME,
  PATHS,
} from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import SystemNavigationItemView from "../components/SystemNavigationItemView";
import { createSystemNavigationPage } from "./SystemNavigation.page";
import { SYSTEM_NAVIGATION_TEST_PATHNAME } from "./SystemNavigation.constants";

describe("SystemNavigation", () => {
  it("marks nested routes current without matching similar route prefixes", () => {
    const page = createSystemNavigationPage();
    const item = {
      label: SYSTEM_NAVIGATION_COPY.BOARD,
      href: PATHS.BOARD,
      icon: MATERIAL_ICON_NAME.DASHBOARD,
    };

    render(
      <SystemNavigationItemView
        item={item}
        pathname={
          SYSTEM_NAVIGATION_TEST_PATHNAME.BOARD_CATEGORY
        }
      />
    );
    expect(
      page.getLastNavigationLink(
        SYSTEM_NAVIGATION_COPY.BOARD
      )
    ).toHaveAttribute("aria-current", ARIA_CURRENT.PAGE);

    render(
      <SystemNavigationItemView
        item={item}
        pathname={
          SYSTEM_NAVIGATION_TEST_PATHNAME.BOARD_SIMILAR_PREFIX
        }
      />
    );
    expect(
      page.getLastNavigationLink(
        SYSTEM_NAVIGATION_COPY.BOARD
      )
    ).not.toHaveAttribute(
      "aria-current",
      ARIA_CURRENT.PAGE
    );
  });

  it("marks the Board destination current on the home path", () => {
    const item = {
      label: SYSTEM_NAVIGATION_COPY.BOARD,
      href: PATHS.BOARD,
      icon: MATERIAL_ICON_NAME.DASHBOARD,
    };

    render(
      <SystemNavigationItemView
        item={item}
        pathname={PATHS.HOME}
      />
    );

    expect(
      createSystemNavigationPage().getLastNavigationLink(
        SYSTEM_NAVIGATION_COPY.BOARD
      )
    ).toHaveAttribute("aria-current", ARIA_CURRENT.PAGE);
  });
});
