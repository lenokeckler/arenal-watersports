import { describe, expect, it } from "vitest";
import {
  CURRENCY_SYMBOL,
  CURRENCY_SYMBOL_SEPARATOR,
  PATHS,
} from "@/app/constants";
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
  EXPECTED_ZERO_USD_PROPOSAL,
  NO_CATALOG_PROPOSAL_CHARGE,
  ZERO_PROPOSAL_CHARGE,
} from "./ReservationChargeScreen.constants";
import { renderReservationChargeSummary } from "./renderReservationChargeSummary";

const FIRST_LEVEL = 1;
const SECOND_LEVEL = 2;
const COLLAPSED_SEPARATOR = " ";

const proposalLine = (amount: string): string =>
  COPY.PROPOSAL_LINE(
    amount.replaceAll(
      CURRENCY_SYMBOL_SEPARATOR,
      COLLAPSED_SEPARATOR
    )
  );

describe("ReservationChargeSummary", () => {
  it("names the reservation under the charge title", () => {
    const page = renderReservationChargeSummary();

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
    const page = renderReservationChargeSummary();

    expect(
      page.queryText(proposalLine(EXPECTED_USD_PROPOSAL))
    ).not.toBeNull();
    expect(
      page.queryText(proposalLine(EXPECTED_CRC_PROPOSAL))
    ).not.toBeNull();
  });

  it("says a currency has no catalog tariff when its proposal is null", () => {
    const page =
      renderReservationChargeSummary(EXPECTED_MIXED);

    expect(
      page.queryText(
        proposalLine(EXPECTED_MIXED_USD_PROPOSAL)
      )
    ).not.toBeNull();
    expect(
      page.queryText(COPY.NO_PROPOSAL_LINE.CRC)
    ).not.toBeNull();
  });

  it("states that the charge is per reservation and not per person", () => {
    const page = renderReservationChargeSummary();

    expect(
      page.queryText(COPY.PER_RESERVATION_NOTE)
    ).not.toBeNull();
  });

  it("links back to the reservation detail", () => {
    const page = renderReservationChargeSummary();

    expect(page.getBackLinkTargets()).toEqual([
      PATHS.RESERVATIONS.DETAIL(EXPECTED_SCHEDULED.id),
    ]);
    expect(
      page.getLink(COPY.BACK_TO_RESERVATION)
    ).toBeInTheDocument();
  });

  it("says there is no catalog tariff in both currencies when both proposals are null", () => {
    const page = renderReservationChargeSummary(
      NO_CATALOG_PROPOSAL_CHARGE
    );

    expect(
      page.queryText(COPY.NO_PROPOSAL_LINE.USD)
    ).not.toBeNull();
    expect(
      page.queryText(COPY.NO_PROPOSAL_LINE.CRC)
    ).not.toBeNull();
  });

  it("shows a zero proposal as an amount and not as a missing tariff", () => {
    const page = renderReservationChargeSummary(
      ZERO_PROPOSAL_CHARGE
    );

    expect(
      page.queryText(
        proposalLine(EXPECTED_ZERO_USD_PROPOSAL)
      )
    ).not.toBeNull();
    expect(
      page.queryText(COPY.NO_PROPOSAL_LINE.USD)
    ).toBeNull();
    expect(
      page.queryText(COPY.NO_PROPOSAL_LINE.CRC)
    ).toBeNull();
  });

  it("keeps the colones proposal distinguishable by its colon symbol", () => {
    const page = renderReservationChargeSummary();

    expect(
      page.queryText(proposalLine(EXPECTED_CRC_PROPOSAL))
    ).not.toBeNull();
    expect(EXPECTED_CRC_PROPOSAL).toContain(
      CURRENCY_SYMBOL.CRC
    );
    expect(EXPECTED_CRC_PROPOSAL).not.toContain(
      CURRENCY_SYMBOL.USD
    );
  });

  it("exposes the summary as a named region with a second level heading under the page title", () => {
    const page = renderReservationChargeSummary();

    expect(
      page.getHeading(COPY.SUMMARY_HEADING, SECOND_LEVEL)
    ).toBeInTheDocument();
    expect(
      page.getHeading(COPY.TITLE, FIRST_LEVEL)
    ).toBeInTheDocument();
    expect(
      page.getRegion(COPY.SUMMARY_HEADING)
    ).toBeInTheDocument();
  });
});
