import { PRICE_LOOKUP_COPY } from "@/app/features/operations/price-lookup/constants/PriceLookupCopy.constants";
import { E2E_PRICE_LOOKUP_SCREENSHOT_BASENAME } from "../constants/E2ePriceLookup.constants";
import { createPriceLookupPage } from "../pages/PriceLookup.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/priceLookupTest";

test.describe("Price lookup screenshots", () => {
  test("captures the prices read by operations", async ({
    operationsPage: page,
    priceLookup,
  }, testInfo) => {
    const prices = createPriceLookupPage(page);

    await prices.goTo();
    await expect(
      prices
        .getSection(PRICE_LOOKUP_COPY.NATIONAL_HEADING)
        .getByText(priceLookup.names.nationalCombo)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_PRICE_LOOKUP_SCREENSHOT_BASENAME.CONTENT,
      testInfo.project.name
    );
  });

  test("captures the refusal of a worker without the operations area", async ({
    reservationsPage: page,
  }, testInfo) => {
    const prices = createPriceLookupPage(page);

    await prices.goTo();
    await expect(prices.getAlert()).toBeVisible();
    await captureFullPage(
      page,
      E2E_PRICE_LOOKUP_SCREENSHOT_BASENAME.FORBIDDEN,
      testInfo.project.name
    );
  });
});
