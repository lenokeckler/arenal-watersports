import { expect, test as baseTest } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createDailyIncomePage } from "../pages/DailyIncome.page";
import { test } from "../support/dailyIncomeTest";

test.describe("Daily income", () => {
  test("a worker of reservas sees each charge of today in the card of its own currency", async ({
    dailyIncome,
    reservationsPage: page,
  }) => {
    const incomePage = createDailyIncomePage(page);

    await incomePage.goTo();

    await expect(page).toHaveURL(PATHS.RESERVATIONS.INCOME);
    for (const charge of [
      dailyIncome.usd,
      dailyIncome.crc,
    ]) {
      const row = incomePage.getMethodRow(
        charge.currency,
        charge.paymentMethod
      );
      await expect(row).toHaveCount(E2E_COUNT.ONE);
      await expect(row).toContainText(formatMoney(charge));
    }
  });

  test("dollars and colones stay in separate cards and are never added together", async ({
    dailyIncome,
    reservationsPage: page,
  }) => {
    const incomePage = createDailyIncomePage(page);

    await incomePage.goTo();

    await expect(
      incomePage.getMethodRow(
        dailyIncome.crc.currency,
        dailyIncome.usd.paymentMethod
      )
    ).toHaveCount(E2E_COUNT.NONE);
    await expect(
      incomePage.getMethodRow(
        dailyIncome.usd.currency,
        dailyIncome.crc.paymentMethod
      )
    ).toHaveCount(E2E_COUNT.NONE);
    await expect(
      incomePage.getCurrencyCard(dailyIncome.usd.currency)
    ).not.toContainText(formatMoney(dailyIncome.crc));
  });
});

test.describe("Daily income for operaciones", () => {
  test("sends a worker of operaciones home without showing any amount of today", async ({
    dailyIncome,
    signedInPage: page,
  }) => {
    await createDailyIncomePage(page).goTo();

    await expect(page).toHaveURL(PATHS.HOME);
    for (const charge of [
      dailyIncome.usd,
      dailyIncome.crc,
    ]) {
      await expect(
        page.getByText(charge.paymentMethod)
      ).toHaveCount(E2E_COUNT.NONE);
    }
  });
});

baseTest.describe("Daily income signed out", () => {
  baseTest(
    "sends a signed-out visitor to the login",
    async ({ page }) => {
      await createDailyIncomePage(page).goTo();

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    }
  );
});
