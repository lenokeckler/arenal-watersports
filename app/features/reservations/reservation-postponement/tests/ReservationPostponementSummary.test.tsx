import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReservationPostponementSummary from "../components/ReservationPostponementSummary";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import {
  EXPECTED_DATE_TIME_TEXT,
  EXPECTED_QUANTITY_LINE_COUNT,
  EXPECTED_SCHEDULED,
  EXPECTED_UNIT_LINE_LABEL,
  PLAIN_CATEGORY,
} from "./ReservationPostponement.constants";
import { createReservationPostponementPage } from "./ReservationPostponement.page";

describe("ReservationPostponementSummary", () => {
  it("shows the code, the customer and the current date and time", () => {
    render(
      <ReservationPostponementSummary
        postponement={EXPECTED_SCHEDULED}
      />
    );
    const page = createReservationPostponementPage();

    expect(
      page.getText(EXPECTED_SCHEDULED.code)
    ).toBeInTheDocument();
    expect(
      page.getText(EXPECTED_SCHEDULED.customerName)
    ).toBeInTheDocument();
    expect(
      page.getText(EXPECTED_DATE_TIME_TEXT)
    ).toBeInTheDocument();
  });

  it("lists units by name and by-quantity items with their quantity", () => {
    render(
      <ReservationPostponementSummary
        postponement={EXPECTED_SCHEDULED}
      />
    );
    const page = createReservationPostponementPage();

    expect(
      page.getText(EXPECTED_SCHEDULED.equipment[1].label)
    ).toBeInTheDocument();
    expect(
      page.getText(PLAIN_CATEGORY.name)
    ).toBeInTheDocument();
    expect(
      page.getText(
        RESERVATION_POSTPONEMENT_UI_COPY.QUANTITY_OF(
          EXPECTED_QUANTITY_LINE_COUNT
        )
      )
    ).toBeInTheDocument();
    expect(page.getListItemTexts()).toHaveLength(
      EXPECTED_SCHEDULED.equipment.length
    );
  });

  it("shows a line without a quantity as its label alone", () => {
    render(
      <ReservationPostponementSummary
        postponement={EXPECTED_SCHEDULED}
      />
    );
    const page = createReservationPostponementPage();

    expect(page.getListItemTexts()).toContain(
      EXPECTED_UNIT_LINE_LABEL
    );
  });
});
