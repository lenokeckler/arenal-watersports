import { expect } from "@playwright/test";
import { INCOME_SIGN_GLYPH } from "@/app/features/administration/income/constants/Income.constants";
import {
  INCOME_COPY,
  INCOME_NO_MOVEMENT_COPY,
} from "@/app/features/administration/income/constants/IncomeCopy.constants";
import type { CurrencyIncomeDisplay } from "@/app/features/administration/income/models/CurrencyIncomeDisplay.interface";
import { formatMoney } from "@/app/utils/money/formatMoney";
import type { createIncomePage } from "../pages/Income.page";

export const expectCurrencyFigures = async (
  incomePage: ReturnType<typeof createIncomePage>,
  display: CurrencyIncomeDisplay
): Promise<void> => {
  const card = incomePage.getCurrencyCard(display.currency);

  if (!display.hasMovement) {
    await expect(card).toContainText(
      INCOME_NO_MOVEMENT_COPY[display.currency]
    );
    return;
  }

  await expect(
    incomePage.getFigure(
      display.currency,
      INCOME_COPY.COLLECTED_LABEL
    )
  ).toHaveText(formatMoney(display.collected));
  await expect(
    incomePage.getFigure(
      display.currency,
      INCOME_COPY.REFUNDED_LABEL
    )
  ).toHaveText(
    display.refunded.amount > 0
      ? `${INCOME_SIGN_GLYPH}${formatMoney(display.refunded)}`
      : formatMoney(display.refunded)
  );
  await expect(
    incomePage.getFigure(
      display.currency,
      INCOME_COPY.NET_LABEL
    )
  ).toContainText(formatMoney(display.net));
};
