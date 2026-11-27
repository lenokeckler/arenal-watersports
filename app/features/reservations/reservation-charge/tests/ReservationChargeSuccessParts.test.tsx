import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_SYMBOL } from "@/app/constants";
import ReservationChargeSuccess from "../components/ReservationChargeSuccess";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { createReservationChargePage } from "./ReservationCharge.page";
import { MIXED_RECORDED } from "./ReservationChargeRecordedParts.constants";

const renderMixedSuccess = () => {
  render(
    <ReservationChargeSuccess
      code={EXPECTED_SCHEDULED.code}
      recorded={MIXED_RECORDED}
      reservationId={EXPECTED_SCHEDULED.id}
    />
  );
  return createReservationChargePage();
};

describe("ReservationChargeSuccess mixed receipt", () => {
  it("lists one row per currency", () => {
    const page = renderMixedSuccess();

    expect(
      page.getDefinitionValue(COPY.LABEL_PART.USD)
    ).toContain(CURRENCY_SYMBOL.USD);
    expect(
      page.getDefinitionValue(COPY.LABEL_PART.CRC)
    ).toContain(CURRENCY_SYMBOL.CRC);
  });

  it("shows one shared method and who recorded it", () => {
    const page = renderMixedSuccess();

    expect(page.getDefinitionValue(COPY.LABEL_METHOD)).toBe(
      MIXED_RECORDED.paymentMethod
    );
    expect(
      page.queryText(
        COPY.RECORDED_BY(MIXED_RECORDED.recordedByName)
      )
    ).not.toBeNull();
  });

  it("drops the single mode amount and currency rows", () => {
    const page = renderMixedSuccess();

    expect(() =>
      page.getDefinitionValue(COPY.LABEL_CURRENCY)
    ).toThrow();
  });
});
