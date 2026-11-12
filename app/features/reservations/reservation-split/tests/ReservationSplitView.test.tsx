import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ReservationSplitView from "../ReservationSplitView";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import {
  EXPECTED_SPLIT,
  SPLIT_QUANTITY_ONLY_SPLIT,
  SPLIT_UNIT_ITEM,
} from "./ReservationSplit.constants";
import { createReservationSplitUnitChoicePage } from "./ReservationSplitUnitChoice.page";

vi.mock("../actions/splitReservationAction", () => ({
  splitReservationAction: vi.fn(),
}));

describe("ReservationSplitView", () => {
  it("composes the original, the charge note, the units and one new departure", () => {
    render(<ReservationSplitView split={EXPECTED_SPLIT} />);

    [
      RESERVATION_SPLIT_UI_COPY.ORIGINAL_HEADING,
      RESERVATION_SPLIT_UI_COPY.CHARGE_NOTE,
      RESERVATION_SPLIT_UI_COPY.UNITS_LEGEND,
      RESERVATION_SPLIT_UI_COPY.DEPARTURE_HEADING(
        RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER
      ),
      RESERVATION_SPLIT_UI_COPY.ADD_DEPARTURE,
    ].forEach((text) =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );
  });

  it("omits the units block when the reservation has no units", () => {
    render(
      <ReservationSplitView
        split={SPLIT_QUANTITY_ONLY_SPLIT}
      />
    );

    expect(
      screen.queryByText(
        RESERVATION_SPLIT_UI_COPY.UNITS_LEGEND
      )
    ).not.toBeInTheDocument();
  });

  it("moves a unit into the new departure when it is chosen", async () => {
    render(<ReservationSplitView split={EXPECTED_SPLIT} />);

    await createReservationSplitUnitChoicePage().selectNoTimeDeparture();

    expect(
      screen.getByText(
        RESERVATION_SPLIT_UI_COPY.CARRIES_UNITS(
          SPLIT_UNIT_ITEM.label
        )
      )
    ).toBeInTheDocument();
  });
});
