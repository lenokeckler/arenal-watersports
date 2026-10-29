import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import CustomComboAgreedAmountField from "../components/CustomComboAgreedAmountField";
import {
  CUSTOM_COMBO_FORM_CURRENCY,
  CUSTOM_COMBO_FORM_INPUT_ID,
} from "../constants/CustomComboFormCopy.constants";
import { createCustomComboAgreedAmountFieldPage } from "./CustomComboAgreedAmountField.page";

describe("CustomComboAgreedAmountField", () => {
  it("explains when a negative agreed amount is rejected", () => {
    render(
      <CustomComboAgreedAmountField
        amount={null}
        currency={CUSTOM_COMBO_FORM_CURRENCY.CRC}
        id={CUSTOM_COMBO_FORM_INPUT_ID.CRC_AMOUNT}
        label={CUSTOM_COMBO_FORM_COPY.CRC_AMOUNT}
        onChange={vi.fn()}
        suggestedAmount={null}
      />
    );
    const page = createCustomComboAgreedAmountFieldPage();

    page.enterNegativeAmount();

    expect(page.getValidationMessage()).toBeInTheDocument();
  });
});
