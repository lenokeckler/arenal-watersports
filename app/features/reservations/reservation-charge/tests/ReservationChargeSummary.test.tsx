import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { RESERVATION_CHARGE_UI_COPY as COPY } from "../constants/ReservationChargeUiCopy.constants";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import {
  EXPECTED_CRC_PROPOSAL,
  EXPECTED_DATE_TIME,
  EXPECTED_DURATION,
  EXPECTED_MIXED,
  EXPECTED_MIXED_USD_PROPOSAL,
  EXPECTED_PEOPLE,
  EXPECTED_USD_PROPOSAL,
} from "./ReservationChargeScreen.constants";
import { renderReservationChargeView } from "./renderReservationChargeView";

describe("ReservationChargeSummary", () => {
  it("names the reservation under the charge title", () => {
    const page = renderReservationChargeView();

    expect(page.getHeading(COPY.TITLE)).toBeInTheDocument();
    expect(
      page.queryText(EXPECTED_SCHEDULED.code)
    ).not.toBeNull();
    expect(
      page.getDefinitionValue(COPY.LABEL_CUSTOMER)
    ).toBe(EXPECTED_SCHEDULED.customerName);
    expect(
      page.getDefinitionValue(COPY.LABEL_DATE_TIME)
    ).toBe(EXPECTED_DATE_TIME);
    expect(
      page.getDefinitionValue(COPY.LABEL_DURATION)
    ).toBe(EXPECTED_DURATION);
    expect(page.getDefinitionValue(COPY.LABEL_PEOPLE)).toBe(
      EXPECTED_PEOPLE
    );
  });

  it("shows the catalog proposal of each currency", () => {
    const page = renderReservationChargeView();

    expect(
      page.getDefinitionValue(COPY.PROPOSAL_LABEL.USD)
    ).toBe(EXPECTED_USD_PROPOSAL);
    expect(
      page.getDefinitionValue(COPY.PROPOSAL_LABEL.CRC)
    ).toBe(EXPECTED_CRC_PROPOSAL);
  });

  it("says a currency has no catalog tariff when its proposal is null", () => {
    const page =
      renderReservationChargeView(EXPECTED_MIXED);

    expect(
      page.getDefinitionValue(COPY.PROPOSAL_LABEL.USD)
    ).toBe(EXPECTED_MIXED_USD_PROPOSAL);
    expect(
      page.getDefinitionValue(COPY.PROPOSAL_LABEL.CRC)
    ).toBe(COPY.NO_PROPOSAL);
  });

  it("states that the charge is per reservation and not per person", () => {
    const page = renderReservationChargeView();

    expect(
      page.queryText(COPY.PER_RESERVATION_NOTE)
    ).not.toBeNull();
  });

  it("links back to the reservation detail", () => {
    const page = renderReservationChargeView();

    expect(page.getBackLinkTargets()).toEqual([
      PATHS.RESERVATIONS.DETAIL(EXPECTED_SCHEDULED.id),
    ]);
    expect(
      page.getLink(COPY.BACK_TO_RESERVATION)
    ).toBeInTheDocument();
  });
});
