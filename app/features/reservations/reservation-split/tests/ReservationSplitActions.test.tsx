import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ReservationSplitActions from "../components/ReservationSplitActions";
import ReservationSplitSuccess from "../components/ReservationSplitSuccess";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import { buildReservationSplitViewModel } from "./buildReservationSplitViewModel";
import {
  EXPECTED_SPLIT,
  SPLIT_CALENDAR_HREF,
  SPLIT_CREATED_DEPARTURES,
  SPLIT_FORM_ERROR,
  SPLIT_SUBMIT_STATE_CASES,
} from "./ReservationSplit.constants";
import { createReservationSplitActionsPage } from "./ReservationSplitActions.page";

const ARIA_DISABLED_ATTRIBUTE = "aria-disabled";
const HREF_ATTRIBUTE = "href";
const ARIA_TRUE = "true";
const CALLED_ONCE = 1;

describe("ReservationSplitActions", () => {
  it("adds a departure on tap", async () => {
    const viewModel =
      buildReservationSplitViewModel(EXPECTED_SPLIT);
    render(
      <ReservationSplitActions viewModel={viewModel} />
    );

    await createReservationSplitActionsPage().clickAdd();

    expect(viewModel.addDeparture).toHaveBeenCalledTimes(
      CALLED_ONCE
    );
  });

  it("ignores the tap and explains when no capacity is left", async () => {
    const viewModel = buildReservationSplitViewModel(
      EXPECTED_SPLIT,
      { canAddDeparture: false }
    );
    render(
      <ReservationSplitActions viewModel={viewModel} />
    );
    const page = createReservationSplitActionsPage();

    await page.clickAdd();

    expect(viewModel.addDeparture).not.toHaveBeenCalled();
    expect(page.getAddButton()).not.toBeDisabled();
    expect(page.getAddButton()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_TRUE
    );
    expect(page.queryBlockedNote()).toBeInTheDocument();
  });

  it.each(SPLIT_SUBMIT_STATE_CASES)(
    "labels and locks the submit button while %s",
    (_state, overrides, label, isDisabled) => {
      render(
        <ReservationSplitActions
          viewModel={buildReservationSplitViewModel(
            EXPECTED_SPLIT,
            overrides
          )}
        />
      );

      const submit =
        createReservationSplitActionsPage().getSubmitButton(
          label
        );

      expect(submit.hasAttribute("disabled")).toBe(
        isDisabled
      );
    }
  );

  it("shows the form error as an alert", () => {
    render(
      <ReservationSplitActions
        viewModel={buildReservationSplitViewModel(
          EXPECTED_SPLIT,
          { formError: SPLIT_FORM_ERROR }
        )}
      />
    );

    expect(
      createReservationSplitActionsPage().queryAlert()
    ).toHaveTextContent(SPLIT_FORM_ERROR);
  });
});

describe("ReservationSplitSuccess", () => {
  it("lists the new codes and links back to the calendar", () => {
    render(
      <ReservationSplitSuccess
        createdDepartures={SPLIT_CREATED_DEPARTURES}
      />
    );
    const page = createReservationSplitActionsPage();

    expect(page.getSuccessStatus()).toHaveTextContent(
      RESERVATION_SPLIT_UI_COPY.SUCCESS(
        SPLIT_CREATED_DEPARTURES.length +
          RESERVATION_SPLIT_DRAFT.ORIGINAL_DEPARTURES
      )
    );
    SPLIT_CREATED_DEPARTURES.forEach(({ code }) =>
      expect(screen.getByText(code)).toBeInTheDocument()
    );
    expect(page.getCalendarLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      SPLIT_CALENDAR_HREF
    );
  });
});
