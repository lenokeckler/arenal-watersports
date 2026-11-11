import { expect } from "@playwright/test";
import {
  CURRENCY_NAME_COPY,
  DEPOSIT_COPY,
  PATHS,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_DEPOSITS_REPORT_SEEDS } from "../constants/E2eDepositsReport.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createDepositsReportPage } from "../pages/DepositsReport.page";
import { test } from "../support/depositsReportTest";
import type { RetainedSeed } from "../support/models/RetainedSeed.interface";
import type { E2eSeededDeposit } from "../support/models/E2eSeededDeposit.interface";

const readHeldTexts = (
  deposit: E2eSeededDeposit
): string[] => [
  `${DEPOSIT_COPY.RESERVATION_CODE_LABEL} ${deposit.reservationCode}`,
  formatMoney(deposit),
  CURRENCY_NAME_COPY[deposit.currency],
];

const readRetainedTexts = (
  deposit: E2eSeededDeposit,
  seed: RetainedSeed
): string[] => [
  `${DEPOSIT_COPY.RESERVATION_CODE_LABEL} ${deposit.reservationCode}`,
  formatMoney({
    amount: seed.retainedAmount,
    currency: seed.currency,
  }),
  CURRENCY_NAME_COPY[seed.currency],
  seed.retentionReason,
];

test.describe("Deposits report", () => {
  test("an administrator sees each held deposit under pending with amount, currency and reservation, and not under retained", async ({
    administratorPage: page,
    depositsReport,
  }) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.DEPOSITS
    );
    for (const deposit of [
      depositsReport.heldUsd,
      depositsReport.heldCrc,
    ]) {
      const row = reportPage.getPendingRow(
        deposit.customerName
      );
      await expect(row).toHaveCount(E2E_COUNT.ONE);
      for (const text of readHeldTexts(deposit)) {
        await expect(row).toContainText(text);
      }
      await expect(
        reportPage.getRetainedRow(deposit.customerName)
      ).toHaveCount(E2E_COUNT.NONE);
    }
  });

  test("retained and partially retained deposits show the retained amount, never the original, and their reason", async ({
    administratorPage: page,
    depositsReport,
  }) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();

    for (const [deposit, seed] of [
      [
        depositsReport.retainedUsd,
        E2E_DEPOSITS_REPORT_SEEDS.RETAINED_USD,
      ],
      [
        depositsReport.partialCrc,
        E2E_DEPOSITS_REPORT_SEEDS.PARTIAL_CRC,
      ],
    ] as const) {
      const row = reportPage.getRetainedRow(
        deposit.customerName
      );
      await expect(row).toHaveCount(E2E_COUNT.ONE);
      for (const text of readRetainedTexts(deposit, seed)) {
        await expect(row).toContainText(text);
      }
      await expect(row).not.toContainText(
        formatMoney(deposit)
      );
      await expect(
        reportPage.getPendingRow(deposit.customerName)
      ).toHaveCount(E2E_COUNT.NONE);
    }
  });

  test("lists retained deposits with the most recently resolved first", async ({
    administratorPage: page,
    depositsReport,
  }) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();

    await expect(
      reportPage.getRetainedRow(
        depositsReport.blankReason.customerName
      )
    ).toHaveCount(E2E_COUNT.ONE);
    expect(
      await reportPage.readRetainedOrder([
        depositsReport.retainedUsd.customerName,
        depositsReport.blankReason.customerName,
        depositsReport.partialCrc.customerName,
      ])
    ).toEqual([
      depositsReport.partialCrc.customerName,
      depositsReport.retainedUsd.customerName,
      depositsReport.blankReason.customerName,
    ]);
  });
});
