import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReservationSplitOriginalCard from "../components/ReservationSplitOriginalCard";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import { formatReservationSplitDuration } from "../utils/formatReservationSplitDuration";
import { buildReservationSplitViewModel } from "./buildReservationSplitViewModel";
import {
  EXPECTED_SPLIT,
  SPLIT_DEPARTURE_NUMBER,
  SPLIT_DRAFT,
  SPLIT_DRAFT_KEY,
  SPLIT_DURATION_CASES,
  SPLIT_UNIT_ITEM,
} from "./ReservationSplit.constants";
import { createReservationSplitCardsPage } from "./ReservationSplitCards.page";

describe("ReservationSplitOriginalCard", () => {
  it("shows what stays in the original", () => {
    const viewModel =
      buildReservationSplitViewModel(EXPECTED_SPLIT);
    render(
      <ReservationSplitOriginalCard
        split={EXPECTED_SPLIT}
        viewModel={viewModel}
      />
    );
    const page = createReservationSplitCardsPage();

    expect(
      page.queryText(EXPECTED_SPLIT.code)
    ).toBeVisible();
    expect(
      page.queryText(
        RESERVATION_SPLIT_UI_COPY.REMAINING_OF(
          EXPECTED_SPLIT.peopleCount -
            SPLIT_DRAFT.peopleCount,
          EXPECTED_SPLIT.peopleCount
        )
      )
    ).toBeVisible();
    expect(
      page.queryText(RESERVATION_SPLIT_UI_COPY.UNIT_STAYS)
    ).toBeVisible();
  });

  it("names the departure that takes a unit", () => {
    const base =
      buildReservationSplitViewModel(EXPECTED_SPLIT);
    const viewModel = buildReservationSplitViewModel(
      EXPECTED_SPLIT,
      {
        state: {
          ...base.state,
          unitAssignments: {
            [SPLIT_UNIT_ITEM.id]: SPLIT_DRAFT_KEY,
          },
        },
      }
    );
    render(
      <ReservationSplitOriginalCard
        split={EXPECTED_SPLIT}
        viewModel={viewModel}
      />
    );

    expect(
      createReservationSplitCardsPage().queryText(
        RESERVATION_SPLIT_UI_COPY.UNIT_GOES_TO(
          SPLIT_DEPARTURE_NUMBER
        )
      )
    ).toBeVisible();
  });
});

describe("formatReservationSplitDuration", () => {
  it.each(SPLIT_DURATION_CASES)(
    "formats %i minutes as %s",
    (minutes, expected) => {
      expect(formatReservationSplitDuration(minutes)).toBe(
        expected
      );
    }
  );
});
