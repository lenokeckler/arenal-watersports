import { fireEvent, screen } from "@testing-library/react";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_AGREED_AMOUNT_TEST } from "./CustomComboAgreedAmountField.constants";

export const createCustomComboAgreedAmountFieldPage =
  () => ({
    getValidationMessage: () =>
      screen.getByText(
        CUSTOM_COMBO_FORM_COPY.INVALID_AGREED_AMOUNT
      ),
    enterNegativeAmount: (): void => {
      fireEvent.change(
        screen.getByLabelText(
          CUSTOM_COMBO_FORM_COPY.CRC_AMOUNT,
          { exact: false }
        ),
        {
          target: {
            value:
              CUSTOM_COMBO_AGREED_AMOUNT_TEST.NEGATIVE_INPUT,
          },
        }
      );
    },
  });
