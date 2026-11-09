import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { ARIA_CURRENT } from "@/app/constants";
import {
  CATEGORY_GROUP_SWITCH_LINK_CURRENT_CLASS,
  CATEGORY_GROUP_SWITCH_LINK_IDLE_CLASS,
} from "../styles/CategoryGroupSwitch.styles";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import CategoryGroupSwitch from "../components/CategoryGroupSwitch";
import {
  ARIA_CURRENT_ATTRIBUTE,
  GROUP_DOUBLE,
  GROUP_INDIVIDUAL,
  GROUP_MEMBERS,
  HREF_ATTRIBUTE,
} from "./CategoryGroupSwitch.constants";
import { createCategoryUnitsScreenPage } from "./CategoryUnitsScreen.page";

const renderSwitch = (
  members = GROUP_MEMBERS,
  currentCategoryId = GROUP_DOUBLE.id
) => {
  render(
    <CategoryGroupSwitch
      currentCategoryId={currentCategoryId}
      members={members}
    />
  );

  return createCategoryUnitsScreenPage();
};

describe("CategoryGroupSwitch", () => {
  it("shows one link per member of the group, in the given order", () => {
    const page = renderSwitch();

    expect(
      page.getSwitchLinks().map((link) => link.textContent)
    ).toEqual([GROUP_DOUBLE.name, GROUP_INDIVIDUAL.name]);
  });

  it("links each member to its own units screen", () => {
    const page = renderSwitch();

    expect(
      page.getSwitchLink(GROUP_DOUBLE.name)
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      resolveBoardCategoryPath(GROUP_DOUBLE.id)
    );
    expect(
      page.getSwitchLink(GROUP_INDIVIDUAL.name)
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      resolveBoardCategoryPath(GROUP_INDIVIDUAL.id)
    );
  });

  it("marks only the current category as the current page", () => {
    const page = renderSwitch(
      GROUP_MEMBERS,
      GROUP_INDIVIDUAL.id
    );

    expect(
      page.getSwitchLink(GROUP_INDIVIDUAL.name)
    ).toHaveAttribute(
      ARIA_CURRENT_ATTRIBUTE,
      ARIA_CURRENT.PAGE
    );
    expect(
      page.getSwitchLink(GROUP_DOUBLE.name)
    ).not.toHaveAttribute(ARIA_CURRENT_ATTRIBUTE);
  });

  it("fills the current pill with the primary color and leaves the others on the surface", () => {
    const page = renderSwitch();

    expect(
      page.getSwitchLink(GROUP_DOUBLE.name)
    ).toHaveClass(CATEGORY_GROUP_SWITCH_LINK_CURRENT_CLASS);
    expect(
      page.getSwitchLink(GROUP_INDIVIDUAL.name)
    ).toHaveClass(CATEGORY_GROUP_SWITCH_LINK_IDLE_CLASS);
  });

  it("renders nothing when the category has no siblings", () => {
    const page = renderSwitch([GROUP_DOUBLE]);

    expect(page.queryGroupSwitch()).not.toBeInTheDocument();
  });

  it("renders nothing when the category has no group", () => {
    const page = renderSwitch([]);

    expect(page.queryGroupSwitch()).not.toBeInTheDocument();
  });
});
