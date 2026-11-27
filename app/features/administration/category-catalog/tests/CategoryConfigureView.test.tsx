import { describe, expect, it } from "vitest";
import { PATHS, STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import { renderCategoryConfigureView } from "./renderCategoryConfigureView";

describe("CategoryConfigureView", () => {
  it("shows the category name and a Regresar link to the category list", () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    expect(
      page.getHeading(DEFAULT_CATEGORY_CONFIGURATION.name)
    ).toBeInTheDocument();
    expect(
      page.getBackLink(CATEGORY_CONFIGURE_COPY.BACK)
    ).toHaveAttribute(
      "href",
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });

  it("shows the status card with the disabled active switch and the locked mode note", () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    expect(
      page.getText(CATEGORY_CONFIGURE_COPY.STATUS_ON_BOARD)
    ).toBeInTheDocument();
    expect(
      page.getText(
        CATEGORY_CONFIGURE_COPY.STATUS_ON_BOARD_DETAIL
      )
    ).toBeInTheDocument();
    expect(
      page.getActiveSwitch(
        CATEGORY_CONFIGURE_COPY.ACTIVE_LABEL
      )
    ).toBeDisabled();
    expect(
      page.getText(CATEGORY_CONFIGURE_COPY.MODE_LOCKED)
    ).toBeInTheDocument();
  });

  it("shows the six section titles with the reservations open and the others closed", () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    expect(
      page.getSectionButton(
        CATEGORY_CONFIGURE_COPY.SECTION_RESERVATIONS
      )
    ).toHaveAttribute("aria-expanded", STRING.TRUE);
    for (const title of [
      CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_UNIT,
      CATEGORY_CONFIGURE_COPY.SECTION_PHOTO,
      CATEGORY_CONFIGURE_COPY.SECTION_DEPOSIT,
      CATEGORY_CONFIGURE_COPY.SECTION_ALERTS,
      CATEGORY_CONFIGURE_COPY.SECTION_TRAITS,
    ]) {
      expect(page.getSectionButton(title)).toHaveAttribute(
        "aria-expanded",
        STRING.FALSE
      );
    }
  });

  it("opens a closed section and closes it again", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();
    const photoTitle =
      CATEGORY_CONFIGURE_COPY.SECTION_PHOTO;

    await page.toggleSection(photoTitle);
    expect(
      page.getSectionButton(photoTitle)
    ).toHaveAttribute("aria-expanded", STRING.TRUE);

    await page.toggleSection(photoTitle);
    expect(
      page.getSectionButton(photoTitle)
    ).toHaveAttribute("aria-expanded", STRING.FALSE);
  });
});
