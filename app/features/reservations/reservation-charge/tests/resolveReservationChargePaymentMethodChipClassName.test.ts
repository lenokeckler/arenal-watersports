import { describe, expect, it } from "vitest";
import {
  RESERVATION_CHARGE_CURRENCY_OPTION_DISABLED_CLASS,
  RESERVATION_CHARGE_CURRENCY_OPTION_ENABLED_CLASS,
  RESERVATION_CHARGE_CURRENCY_OPTION_SELECTED_CLASS,
} from "../styles/ReservationChargeCurrency.styles";
import {
  RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_CLASS,
  RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_IDLE_CLASS,
  RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_INVALID_CLASS,
  resolveReservationChargePaymentMethodChipClassName,
} from "../styles/ReservationChargePaymentMethod.styles";

const IDLE_STATE = {
  isDisabled: false,
  isInvalid: false,
  isSelected: false,
};

describe("resolveReservationChargePaymentMethodChipClassName", () => {
  it("styles an idle enabled chip", () => {
    const className =
      resolveReservationChargePaymentMethodChipClassName(
        IDLE_STATE
      );

    expect(className).toContain(
      RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_CLASS
    );
    expect(className).toContain(
      RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_IDLE_CLASS
    );
    expect(className).toContain(
      RESERVATION_CHARGE_CURRENCY_OPTION_ENABLED_CLASS
    );
  });

  it("styles a selected chip", () => {
    const className =
      resolveReservationChargePaymentMethodChipClassName({
        ...IDLE_STATE,
        isSelected: true,
      });

    expect(className).toContain(
      RESERVATION_CHARGE_CURRENCY_OPTION_SELECTED_CLASS
    );
    expect(className).not.toContain(
      RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_IDLE_CLASS
    );
  });

  it("marks an unselected chip of an invalid group", () => {
    const className =
      resolveReservationChargePaymentMethodChipClassName({
        ...IDLE_STATE,
        isInvalid: true,
      });

    expect(className).toContain(
      RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_INVALID_CLASS
    );
  });

  it("keeps the selected look over the invalid one", () => {
    const className =
      resolveReservationChargePaymentMethodChipClassName({
        isDisabled: false,
        isInvalid: true,
        isSelected: true,
      });

    expect(className).toContain(
      RESERVATION_CHARGE_CURRENCY_OPTION_SELECTED_CLASS
    );
    expect(className).not.toContain(
      RESERVATION_CHARGE_PAYMENT_METHOD_CHIP_INVALID_CLASS
    );
  });

  it("dims a disabled chip", () => {
    const className =
      resolveReservationChargePaymentMethodChipClassName({
        ...IDLE_STATE,
        isDisabled: true,
      });

    expect(className).toContain(
      RESERVATION_CHARGE_CURRENCY_OPTION_DISABLED_CLASS
    );
    expect(className).not.toContain(
      RESERVATION_CHARGE_CURRENCY_OPTION_ENABLED_CLASS
    );
  });
});
