import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReservationSplitDepartureCard from "../components/ReservationSplitDepartureCard";
import ReservationSplitOriginalCard from "../components/ReservationSplitOriginalCard";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { formatReservationSplitDuration } from "../utils/formatReservationSplitDuration";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitViewModel } from "../models/ReservationSplitViewModel.interface";
import { buildReservationSplitViewModel } from "./buildReservationSplitViewModel";
import {
  EXPECTED_SPLIT,
  SPLIT_DEPARTURE_NUMBER,
  SPLIT_DRAFT,
  SPLIT_DRAFT_KEY,
  SPLIT_DURATION_CASES,
  SPLIT_SECOND_DEPARTURE_NUMBER,
  SPLIT_SECOND_DRAFT_KEY,
  SPLIT_SECOND_DRAFT_TIME,
  SPLIT_ITEMS_ERROR,
  SPLIT_PEOPLE_ERROR,
  SPLIT_UNIT_ITEM,
} from "./ReservationSplit.constants";
import { createReservationSplitCardsPage } from "./ReservationSplitCards.page";

const renderDeparture = (
  overrides: Partial<ReservationSplitViewModel> = {}
) => {
  const viewModel = buildReservationSplitViewModel(
    EXPECTED_SPLIT,
    overrides
  );
  render(
    <ReservationSplitDepartureCard
      departureNumber={SPLIT_DEPARTURE_NUMBER}
      draft={viewModel.state.drafts[0]}
      split={EXPECTED_SPLIT}
      viewModel={viewModel}
    />
  );
  return {
    page: createReservationSplitCardsPage(),
    viewModel,
  };
};

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

describe("ReservationSplitDepartureCard", () => {
  it("steps the people count and hides remove for one departure", async () => {
    const { page, viewModel } = renderDeparture();

    await page.increasePeople();

    expect(viewModel.stepPeopleCount).toHaveBeenCalledWith(
      SPLIT_DRAFT_KEY,
      RESERVATION_SPLIT_DRAFT.STEP_UP
    );
    expect(
      page.queryRemoveButton()
    ).not.toBeInTheDocument();
  });

  it("shows the unit it carries and the people error", () => {
    const base =
      buildReservationSplitViewModel(EXPECTED_SPLIT);
    const { page } = renderDeparture({
      errors: {
        departures: [
          {
            items: SPLIT_ITEMS_ERROR,
            peopleCount: SPLIT_PEOPLE_ERROR,
          },
        ],
      },
      state: {
        ...base.state,
        unitAssignments: {
          [SPLIT_UNIT_ITEM.id]: SPLIT_DRAFT_KEY,
        },
      },
    });

    expect(
      page.queryText(
        RESERVATION_SPLIT_UI_COPY.CARRIES_UNITS(
          SPLIT_UNIT_ITEM.label
        )
      )
    ).toBeVisible();
    expect(
      page.queryText(SPLIT_PEOPLE_ERROR)
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

describe("two departures", () => {
  it("keeps ids unique, offers remove on each and sets the time", () => {
    const base =
      buildReservationSplitViewModel(EXPECTED_SPLIT);
    const state = {
      ...base.state,
      drafts: [
        base.state.drafts[0],
        { ...SPLIT_DRAFT, key: SPLIT_SECOND_DRAFT_KEY },
      ],
    };
    const viewModel = buildReservationSplitViewModel(
      EXPECTED_SPLIT,
      { state }
    );
    render(
      state.drafts.map((draft, index) => (
        <ReservationSplitDepartureCard
          key={draft.key}
          departureNumber={SPLIT_DEPARTURE_NUMBER + index}
          draft={draft}
          split={EXPECTED_SPLIT}
          viewModel={viewModel}
        />
      ))
    );
    const page = createReservationSplitCardsPage();
    const ids = page.getElementIds();

    page.changeTime(1, SPLIT_SECOND_DRAFT_TIME);

    expect(new Set(ids).size).toBe(ids.length);
    expect(page.queryRemoveButton()).toBeInTheDocument();
    expect(
      page.queryRemoveButton(SPLIT_SECOND_DEPARTURE_NUMBER)
    ).toBeInTheDocument();
    expect(viewModel.setTime).toHaveBeenCalledWith(
      SPLIT_SECOND_DRAFT_KEY,
      SPLIT_SECOND_DRAFT_TIME
    );
  });
});
