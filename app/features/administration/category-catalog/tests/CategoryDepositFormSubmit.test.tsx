import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
} from "@/app/constants";
import { CATEGORY_DEPOSIT_ERROR_COPY } from "../constants/CategoryDepositErrorCopy.constants";
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";
import {
  COUNTERPART_CURRENCY,
  DEPOSIT_FIELD_CURRENCY_ORDER,
  INVALID_AMOUNT_TEXT,
  TYPED_USD_AMOUNT,
  TYPED_USD_TEXT,
} from "./CategoryDepositForm.constants";
import { renderCategoryDepositForm } from "./renderCategoryDepositForm";
import { buildUpdateCategoryDepositInput } from "./UpdateCategoryDepositInput.constants";
import {
  EDITED_DEPOSIT_CRC_AMOUNT,
  EDITED_DEPOSIT_CRC_TEXT,
  SUCCESS_RESULT,
} from "./useCategoryDepositForm.constants";

const mockUpdateCategoryDepositAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryDepositAction", () => ({
  updateCategoryDepositAction: (
    input: UpdateCategoryDepositInput
  ) => mockUpdateCategoryDepositAction(input),
}));

describe("CategoryDepositForm submit", () => {
  beforeEach(() => {
    mockUpdateCategoryDepositAction.mockReset();
    mockUpdateCategoryDepositAction.mockResolvedValue(
      SUCCESS_RESULT
    );
  });

  it("sends both amounts as numbers when Guardar depósito is clicked", async () => {
    const depositFormPage = renderCategoryDepositForm();

    await depositFormPage.typeAmount(
      CURRENCY_CODE.USD,
      TYPED_USD_TEXT
    );
    await depositFormPage.typeAmount(
      CURRENCY_CODE.CRC,
      EDITED_DEPOSIT_CRC_TEXT
    );
    await depositFormPage.submit();

    await waitFor(() =>
      expect(
        mockUpdateCategoryDepositAction
      ).toHaveBeenCalledWith(
        buildUpdateCategoryDepositInput({
          depositCrc: EDITED_DEPOSIT_CRC_AMOUNT,
          depositUsd: TYPED_USD_AMOUNT,
        })
      )
    );
    await depositFormPage.waitForSubmitSettled();
  });

  it("sends null for both amounts when both fields are cleared", async () => {
    const depositFormPage = renderCategoryDepositForm();

    await depositFormPage.clearBothAmounts();
    await depositFormPage.submit();

    await waitFor(() =>
      expect(
        mockUpdateCategoryDepositAction
      ).toHaveBeenCalledWith(
        buildUpdateCategoryDepositInput({
          depositCrc: null,
          depositUsd: null,
        })
      )
    );
    await depositFormPage.waitForSubmitSettled();
  });

  it.each(DEPOSIT_FIELD_CURRENCY_ORDER)(
    "shows the %s error under that field only and saves nothing",
    async (currency) => {
      const depositFormPage = renderCategoryDepositForm();
      const formatError =
        CATEGORY_DEPOSIT_ERROR_COPY[currency][
          MONEY_AMOUNT_ISSUE.FORMAT
        ];

      await depositFormPage.typeAmount(
        currency,
        INVALID_AMOUNT_TEXT
      );
      await depositFormPage.submit();

      expect(
        await depositFormPage.findTextMatches(formatError)
      ).toHaveLength(1);
      expect(
        depositFormPage.getAmountInput(currency)
      ).toHaveAccessibleDescription(
        expect.stringContaining(formatError)
      );
      expect(
        depositFormPage.getAmountInput(
          COUNTERPART_CURRENCY[currency]
        )
      ).not.toHaveAccessibleDescription(
        expect.stringContaining(formatError)
      );
      expect(
        mockUpdateCategoryDepositAction
      ).not.toHaveBeenCalled();
    }
  );
});
