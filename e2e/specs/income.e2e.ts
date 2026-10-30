import { test as baseTest } from "@playwright/test";
import { CURRENCY_CODE, PATHS } from "@/app/constants";
import { INCOME_COPY } from "@/app/features/administration/income/constants/IncomeCopy.constants";
import { INCOME_SIGN_GLYPH } from "@/app/features/administration/income/constants/Income.constants";
import { expectCurrencyFigures } from "../support/expectCurrencyFigures";
import { E2E_INCOME_SYMBOL } from "../constants/E2eIncome.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createIncomePage } from "../pages/Income.page";
import { createServiceRoleClient } from "../support/createServiceRoleClient";
import { expect, test } from "../support/incomeTest";
import { readTodayIncomeDisplays } from "../support/readTodayIncomeDisplays";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test.describe.configure({ mode: "serial" });

test.describe("Daily income report", () => {
  test("administration sees today's charged, refunded and net figures of each currency in its own card", async ({
    incomeMovements,
    page,
  }) => {
    const incomePage = createIncomePage(page);
    await signInAsSeededWorker(page);
    await incomePage.goTo();
    await expect(incomePage.getHeading()).toBeVisible();
    expect(incomeMovements.chargeIds).toHaveLength(2);

    await expect(async () => {
      await page.reload();
      for (const display of await readTodayIncomeDisplays(
        createServiceRoleClient()
      )) {
        await expectCurrencyFigures(incomePage, display);
      }
    }).toPass();
  });

  test("a day that refunded more colones than it charged marks the net as negative", async ({
    incomeMovements,
    page,
  }) => {
    const incomePage = createIncomePage(page);
    await signInAsSeededWorker(page);
    await incomePage.goTo();

    expect(incomeMovements.refundIds).toHaveLength(1);
    await expect(
      incomePage.getNegativeNote(CURRENCY_CODE.CRC)
    ).toBeVisible();
    await expect(
      incomePage.getFigure(
        CURRENCY_CODE.CRC,
        INCOME_COPY.NET_LABEL
      )
    ).toContainText(
      `${INCOME_SIGN_GLYPH}${INCOME_COPY.NEGATIVE_SCREEN_READER_PREFIX}`
    );
  });

  test("dollars and colones never share a card", async ({
    incomeMovements,
    page,
  }) => {
    const incomePage = createIncomePage(page);
    await signInAsSeededWorker(page);
    await incomePage.goTo();

    expect(incomeMovements.reservationId).toBeTruthy();
    await expect(
      incomePage.getCurrencyCard(CURRENCY_CODE.USD)
    ).not.toContainText(E2E_INCOME_SYMBOL.CRC);
    await expect(
      incomePage.getCurrencyCard(CURRENCY_CODE.CRC)
    ).not.toContainText(E2E_INCOME_SYMBOL.USD);
  });
});

test.describe("Daily income report access", () => {
  test("sends a worker of operaciones home without any amount", async ({
    signedInPage: page,
  }) => {
    const incomePage = createIncomePage(page);
    await incomePage.goTo();

    await expect(page).toHaveURL(PATHS.HOME);
    await expect(incomePage.getPageTitle()).toHaveCount(
      E2E_COUNT.NONE
    );
  });

  test("sends a worker with reservas home, because only administration reads it", async ({
    activeWorker,
    page,
  }) => {
    await signInToReservationsMode(page, activeWorker);
    const incomePage = createIncomePage(page);
    await incomePage.goTo();

    await expect(page).toHaveURL(PATHS.HOME);
    await expect(incomePage.getPageTitle()).toHaveCount(
      E2E_COUNT.NONE
    );
  });
});

baseTest.describe("Daily income report signed out", () => {
  baseTest(
    "sends a signed-out visitor to the login",
    async ({ page }) => {
      await createIncomePage(page).goTo();

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    }
  );
});
