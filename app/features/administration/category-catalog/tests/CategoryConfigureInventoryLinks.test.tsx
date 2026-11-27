import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { resolveCategoryStockPath } from "../utils/resolveCategoryStockPath";
import { resolveCategoryUnitsPath } from "../utils/resolveCategoryUnitsPath";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
} from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";
import { renderCategoryConfigureView } from "./renderCategoryConfigureView";

describe("CategoryConfigureView inventory section", () => {
  it("links a by-unit category to its units screen from the inventory section", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    await page.toggleSection(
      CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_UNIT
    );

    expect(
      page.getLink(
        CATEGORY_CONFIGURE_COPY.INVENTORY_VIEW_UNITS
      )
    ).toHaveAttribute(
      "href",
      resolveCategoryUnitsPath(FAKE_CATEGORY_ID)
    );
  });

  it("links a by-quantity category to its stock screen from the inventory section", async () => {
    renderCategoryConfigureView(
      buildCategoryConfiguration({
        behavior: {
          ...DEFAULT_CATEGORY_CONFIGURATION.behavior,
          trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
        },
      })
    );
    const page = createCategoryConfigureViewPage();

    await page.toggleSection(
      CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_QUANTITY
    );

    expect(
      page.getLink(
        CATEGORY_CONFIGURE_COPY.INVENTORY_REGISTER_STOCK
      )
    ).toHaveAttribute(
      "href",
      resolveCategoryStockPath(FAKE_CATEGORY_ID)
    );
  });
});
