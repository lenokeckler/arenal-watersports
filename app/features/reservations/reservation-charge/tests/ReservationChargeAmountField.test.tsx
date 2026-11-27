import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE, CURRENCY_CODE } from "@/app/constants";
import ReservationChargeAmountField from "../components/ReservationChargeAmountField";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeAmountFieldProps } from "../models/ReservationChargeAmountFieldProps.interface";
import {
  AMOUNT_FIELD_ERROR,
  AMOUNT_FIELD_PROPOSAL,
  AMOUNT_FIELD_TYPED_CHARACTER,
  AMOUNT_FIELD_VALUE,
} from "./ReservationChargeAmountField.constants";

const renderField = (
  overrides: Partial<ReservationChargeAmountFieldProps> = {}
) => {
  const onChange = vi.fn();
  render(
    <ReservationChargeAmountField
      currency={CURRENCY_CODE.USD}
      helperId={FIELD_ID.AMOUNT_HELPER}
      id={FIELD_ID.AMOUNT}
      isDisabled={false}
      onChange={onChange}
      proposal={AMOUNT_FIELD_PROPOSAL}
      value={AMOUNT_FIELD_VALUE}
      {...overrides}
    />
  );
  return {
    getInput: () =>
      screen.getByRole(ARIA_ROLE.TEXTBOX, {
        name: new RegExp(
          COPY.AMOUNT_LABEL[
            overrides.currency ?? CURRENCY_CODE.USD
          ]
        ),
      }),
    onChange,
  };
};

describe("ReservationChargeAmountField", () => {
  it.each([CURRENCY_CODE.USD, CURRENCY_CODE.CRC])(
    "labels the field with the agreed amount in %s",
    (currency) => {
      const { getInput } = renderField({ currency });

      expect(getInput()).toHaveValue(AMOUNT_FIELD_VALUE);
    }
  );

  it("describes a proposed amount as adjustable", () => {
    renderField();

    expect(
      screen.getByText(COPY.AMOUNT_HELPER_PROPOSED)
    ).toBeInTheDocument();
  });

  it("asks for a manual amount when there is no proposal", () => {
    renderField({ proposal: null });

    expect(
      screen.getByText(COPY.AMOUNT_HELPER_MANUAL)
    ).toBeInTheDocument();
  });

  it("shows the error text", () => {
    renderField({ error: AMOUNT_FIELD_ERROR });

    expect(
      screen.getByText(AMOUNT_FIELD_ERROR)
    ).toBeInTheDocument();
  });

  it("disables the input", () => {
    const { getInput } = renderField({ isDisabled: true });

    expect(getInput()).toBeDisabled();
  });

  it("reports the typed text", async () => {
    const { getInput, onChange } = renderField();

    await userEvent.type(
      getInput(),
      AMOUNT_FIELD_TYPED_CHARACTER
    );

    expect(onChange).toHaveBeenCalledWith(
      `${AMOUNT_FIELD_VALUE}${AMOUNT_FIELD_TYPED_CHARACTER}`
    );
  });
});
