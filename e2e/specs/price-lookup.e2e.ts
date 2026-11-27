import {
  ARIA_ROLE,
  CURRENCY_CODE,
  PATHS,
} from "@/app/constants";
import { PRICE_LOOKUP_COPY } from "@/app/features/operations/price-lookup/constants/PriceLookupCopy.constants";
import { SYSTEM_NAVIGATION_COPY } from "@/app/features/access/system-navigation/constants/SystemNavigationCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  E2E_PRICE_LOOKUP_AMOUNT,
  E2E_PRICE_LOOKUP_MONEY_PATTERN,
} from "../constants/E2ePriceLookup.constants";
import { createPriceLookupPage } from "../pages/PriceLookup.page";
import { createSystemNavigationPage } from "../pages/SystemNavigation.page";
import { expect, test } from "../support/priceLookupTest";

const formatCrc = (amount: number): string =>
  formatMoney({ amount, currency: CURRENCY_CODE.CRC });

const formatUsd = (amount: number): string =>
  formatMoney({ amount, currency: CURRENCY_CODE.USD });

test.describe("Price lookup", () => {
  test("lists the tariffs of an active category per outing type with each currency apart", async ({
    operationsPage: page,
    priceLookup,
  }) => {
    const prices = createPriceLookupPage(page);

    await prices.goTo();

    await expect(prices.getHeading()).toBeVisible();
    const tariffs = prices.getSection(
      PRICE_LOOKUP_COPY.TARIFFS_HEADING
    );
    const category = prices.getGroup(
      tariffs,
      priceLookup.names.activeCategory
    );
    const rental = prices.getRow(
      category,
      PRICE_LOOKUP_COPY.RENTAL_LABEL
    );
    const tour = prices.getRow(
      category,
      PRICE_LOOKUP_COPY.TOUR_LABEL
    );

    await expect(
      tariffs.getByRole(ARIA_ROLE.HEADING, {
        name: priceLookup.names.activeCategory,
      })
    ).toBeVisible();
    await expect(rental).toContainText(
      formatUsd(E2E_PRICE_LOOKUP_AMOUNT.RENTAL_USD)
    );
    await expect(rental).toContainText(
      formatCrc(E2E_PRICE_LOOKUP_AMOUNT.RENTAL_CRC)
    );
    await expect(tour).toContainText(
      formatUsd(E2E_PRICE_LOOKUP_AMOUNT.TOUR_USD)
    );
  });

  test("files extras and combos in the section of their audience, each in its own currency", async ({
    operationsPage: page,
    priceLookup,
  }) => {
    const prices = createPriceLookupPage(page);
    const { names } = priceLookup;

    await prices.goTo();

    const nationals = prices.getSection(
      PRICE_LOOKUP_COPY.NATIONAL_HEADING
    );
    const foreigners = prices.getSection(
      PRICE_LOOKUP_COPY.FOREIGN_HEADING
    );

    await expect(
      prices.getRow(nationals, names.activeExtra)
    ).toContainText(
      formatCrc(E2E_PRICE_LOOKUP_AMOUNT.EXTRA_BOTH_CRC)
    );
    await expect(
      prices.getRow(nationals, names.nationalCombo)
    ).toContainText(
      formatCrc(E2E_PRICE_LOOKUP_AMOUNT.COMBO_NATIONAL_CRC)
    );
    await expect(
      prices.getRow(nationals, names.foreignOnlyExtra)
    ).toHaveCount(0);
    await expect(
      prices.getRow(nationals, names.foreignCombo)
    ).toHaveCount(0);
    await expect(
      prices.getRow(foreigners, names.activeExtra)
    ).toContainText(
      formatUsd(E2E_PRICE_LOOKUP_AMOUNT.EXTRA_BOTH_USD)
    );
    await expect(
      prices.getRow(foreigners, names.foreignOnlyExtra)
    ).toContainText(
      formatUsd(
        E2E_PRICE_LOOKUP_AMOUNT.EXTRA_FOREIGN_ONLY_USD
      )
    );
    await expect(
      prices.getRow(foreigners, names.foreignCombo)
    ).toContainText(
      formatUsd(E2E_PRICE_LOOKUP_AMOUNT.COMBO_FOREIGN_USD)
    );
    await expect(
      prices.getRow(foreigners, names.nationalCombo)
    ).toHaveCount(0);
  });

  test("shows only the active categories, extras and combos", async ({
    operationsPage: page,
    priceLookup,
  }) => {
    const prices = createPriceLookupPage(page);
    const { names } = priceLookup;

    await prices.goTo();

    await expect(prices.getHeading()).toBeVisible();
    await expect(
      page.getByText(names.activeCategory).first()
    ).toBeVisible();
    for (const inactiveName of [
      names.inactiveCategory,
      names.inactiveExtra,
      names.inactiveCombo,
    ]) {
      await expect(
        page.getByText(inactiveName)
      ).toHaveCount(0);
    }
  });

  test("is read-only and shows no charges, refunds or deposits", async ({
    operationsPage: page,
    priceLookup: _priceLookup,
  }) => {
    const prices = createPriceLookupPage(page);

    await prices.goTo();

    await expect(prices.getHeading()).toBeVisible();
    await expect(
      prices.getInteractiveElements()
    ).toHaveCount(0);
    await expect(prices.getMain()).not.toContainText(
      E2E_PRICE_LOOKUP_MONEY_PATTERN
    );
  });

  test("opens from the operations navigation", async ({
    operationsPage: page,
  }) => {
    const navigation = createSystemNavigationPage(page);

    await navigation
      .getLink(SYSTEM_NAVIGATION_COPY.PRICES)
      .click();

    await expect(page).toHaveURL(
      PATHS.OPERATIONS.PRICE_LOOKUP
    );
    await expect(
      createPriceLookupPage(page).getHeading()
    ).toBeVisible();
  });

  test("refuses a worker without the operations area", async ({
    reservationsPage: page,
  }) => {
    const prices = createPriceLookupPage(page);

    await prices.goTo();

    await expect(prices.getAlert()).toContainText(
      PRICE_LOOKUP_COPY.FORBIDDEN
    );
  });
});
