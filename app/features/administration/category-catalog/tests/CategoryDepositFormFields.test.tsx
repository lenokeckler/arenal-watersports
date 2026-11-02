import { describe, expect, it, vi } from "vitest";
import { CURRENCY_CODE, INPUT_MODE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import {
  INPUT_MODE_ATTRIBUTE,
  PLACEHOLDER_ATTRIBUTE,
  SUMMARY_TEXT_PATTERN,
  TYPED_USD_TEXT,
} from "./CategoryDepositForm.constants";
import { renderCategoryDepositForm } from "./renderCategoryDepositForm";
import { EDITED_DEPOSIT_CRC_TEXT } from "./useCategoryDepositForm.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryDepositAction", () => ({
  updateCategoryDepositAction: vi.fn(),
}));

describe("CategoryDepositForm fields", () => {
  it("opens the decimal keypad on both fields", () => {
    const depositFormPage = renderCategoryDepositForm();

    depositFormPage.getAmountInputs().forEach((input) => {
      expect(input).toHaveAttribute(
        INPUT_MODE_ATTRIBUTE,
        INPUT_MODE.DECIMAL
      );
    });
  });

  it("describes both fields with the hint", () => {
    const depositFormPage = renderCategoryDepositForm();

    depositFormPage.getAmountInputs().forEach((input) => {
      expect(input).toHaveAccessibleDescription(
        CATEGORY_CATALOG_COPY.DEPOSIT_FORM_HINT
      );
    });
  });

  it("shows the no-deposit placeholder on both cleared fields", async () => {
    const depositFormPage = renderCategoryDepositForm();

    await depositFormPage.clearBothAmounts();

    depositFormPage.getAmountInputs().forEach((input) => {
      expect(input).toHaveAttribute(
        PLACEHOLDER_ATTRIBUTE,
        CATEGORY_CATALOG_COPY.DEPOSIT_FIELD_PLACEHOLDER
      );
    });
  });

  it("never renders a total or a converted amount after both amounts are typed", async () => {
    const depositFormPage = renderCategoryDepositForm();

    await depositFormPage.typeAmount(
      CURRENCY_CODE.USD,
      TYPED_USD_TEXT
    );
    await depositFormPage.typeAmount(
      CURRENCY_CODE.CRC,
      EDITED_DEPOSIT_CRC_TEXT
    );

    expect(
      depositFormPage.queryTextOutsideHint(
        SUMMARY_TEXT_PATTERN
      )
    ).toHaveLength(0);
  });
});
