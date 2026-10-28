import { expect, test as baseTest } from "@playwright/test";
import { PATHS } from "@/app/constants";
import {
  CURRENCY_NAME,
  PENDING_DEPOSITS_COPY,
} from "@/app/features/reservations/pending-deposits/constants/PendingDepositsCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createPendingDepositsPage } from "../pages/PendingDeposits.page";
import type { E2eSeededDeposit } from "../support/models/E2eSeededDeposit.interface";
import { test } from "../support/pendingDepositsTest";

const readExpectedTexts = (
  deposit: E2eSeededDeposit
): string[] => [
  deposit.customerName,
  `${PENDING_DEPOSITS_COPY.RESERVATION_CODE_LABEL} ${deposit.reservationCode}`,
  formatMoney(deposit),
  CURRENCY_NAME[deposit.currency],
];

test.describe("Pending deposits", () => {
  test("a worker of reservas sees each held deposit with its amount, currency and reservation, and not the returned one", async ({
    pendingDeposits,
    reservationsPage: page,
  }) => {
    const depositsPage = createPendingDepositsPage(page);

    await depositsPage.goTo();

    await expect(page).toHaveURL(
      PATHS.RESERVATIONS.DEPOSITS
    );
    for (const deposit of [
      pendingDeposits.usd,
      pendingDeposits.crc,
    ]) {
      const row = depositsPage.getRow(deposit.customerName);
      await expect(row).toHaveCount(E2E_COUNT.ONE);
      for (const text of readExpectedTexts(deposit)) {
        await expect(row).toContainText(text);
      }
    }
    await expect(
      depositsPage.getRow(
        pendingDeposits.returned.customerName
      )
    ).toHaveCount(E2E_COUNT.NONE);
  });

  test("dollars and colones stay in separate rows and never in one total", async ({
    pendingDeposits,
    reservationsPage: page,
  }) => {
    const depositsPage = createPendingDepositsPage(page);

    await depositsPage.goTo();

    const usdRow = depositsPage.getRow(
      pendingDeposits.usd.customerName
    );
    const crcRow = depositsPage.getRow(
      pendingDeposits.crc.customerName
    );
    await expect(usdRow).toContainText(
      formatMoney(pendingDeposits.usd)
    );
    await expect(usdRow).not.toContainText(
      formatMoney(pendingDeposits.crc)
    );
    await expect(crcRow).toContainText(
      formatMoney(pendingDeposits.crc)
    );
    await expect(crcRow).not.toContainText(
      formatMoney(pendingDeposits.usd)
    );
  });
});

baseTest.describe("Pending deposits signed out", () => {
  baseTest(
    "sends a signed-out visitor to the login",
    async ({ page }) => {
      await createPendingDepositsPage(page).goTo();

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    }
  );
});
