import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import ReservationPostponementView from "../ReservationPostponementView";
import { postponeReservationAction } from "../actions/postponeReservationAction";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY as COPY } from "../constants/ReservationPostponementFormCopy.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import {
  DISPATCHED_POSTPONEMENT,
  NEW_DATE,
  NEW_DATE_TEXT,
  OTHER_REASON,
  SCHEDULED_POSTPONEMENT,
} from "./ReservationPostponementDraft.constants";
import { createReservationPostponementViewPage } from "./ReservationPostponementView.page";

vi.mock("../actions/postponeReservationAction", () => ({
  postponeReservationAction: vi.fn(),
}));

const renderView = (
  postponement: ReservationPostponement
) => {
  render(
    <ReservationPostponementView
      postponement={postponement}
    />
  );
  return createReservationPostponementViewPage();
};

describe("ReservationPostponementView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts from the current date and time with every cause and the kept-charge note", () => {
    const page = renderView(SCHEDULED_POSTPONEMENT);

    expect(page.getDateInput()).toHaveValue(
      SCHEDULED_POSTPONEMENT.date
    );
    expect(page.getTimeInput()).toHaveValue(
      SCHEDULED_POSTPONEMENT.time
    );
    expect(page.getCauseNames()).toEqual([
      RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
      RESERVATION_POSTPONEMENT_CAUSE.STORM,
      RESERVATION_POSTPONEMENT_CAUSE.OTHER,
    ]);
    expect(page.queryText(COPY.NOTE_KEPT)).not.toBeNull();
    expect(
      page.queryText(COPY.NOTE_WEATHER_ONLY)
    ).toBeNull();
  });

  it("offers only weather causes and warns about it for a dispatched reservation", () => {
    const page = renderView(DISPATCHED_POSTPONEMENT);

    expect(page.getCauseNames()).toEqual([
      RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
      RESERVATION_POSTPONEMENT_CAUSE.STORM,
    ]);
    expect(
      page.queryText(COPY.NOTE_WEATHER_ONLY)
    ).not.toBeNull();
  });

  it("asks for a cause before calling the action and focuses the first problem", async () => {
    const page = renderView(SCHEDULED_POSTPONEMENT);

    await page.submit();

    expect(
      page.queryText(FEEDBACK.CAUSE_REQUIRED)
    ).not.toBeNull();
    expect(
      postponeReservationAction
    ).not.toHaveBeenCalled();
  });

  it("shows the reason field only for another cause", async () => {
    const page = renderView(SCHEDULED_POSTPONEMENT);

    expect(page.queryReason()).toBeNull();
    await page.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.OTHER
    );
    expect(page.queryReason()).not.toBeNull();
    await page.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.STORM
    );
    expect(page.queryReason()).toBeNull();
  });

  it("postpones with another cause and its reason, then confirms the new schedule", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: true,
      reservationId: SCHEDULED_POSTPONEMENT.id,
    });
    const page = renderView(SCHEDULED_POSTPONEMENT);

    await page.setDate(NEW_DATE);
    await page.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.OTHER
    );
    await page.typeReason(OTHER_REASON);
    await page.submit();

    await waitFor(() =>
      expect(page.getStatusText()).toContain(NEW_DATE_TEXT)
    );
    expect(postponeReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
        date: NEW_DATE,
        reason: OTHER_REASON,
        time: SCHEDULED_POSTPONEMENT.time,
      })
    );
  });

  it("keeps the form filled and shows the refusal of the server", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: false,
      errors: { readings: {} },
      formError: FEEDBACK.UNIT_UNAVAILABLE,
    });
    const page = renderView(SCHEDULED_POSTPONEMENT);

    await page.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.STORM
    );
    await page.submit();

    await waitFor(() =>
      expect(page.getAlertText()).toBe(
        FEEDBACK.UNIT_UNAVAILABLE
      )
    );
    expect(page.getSubmit()).toBeEnabled();
  });

  it("disables the submit once the form went stale", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: false,
      errors: { readings: {} },
      formError: FEEDBACK.STALE,
    });
    const page = renderView(SCHEDULED_POSTPONEMENT);

    await page.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.STORM
    );
    await page.submit();

    await waitFor(() =>
      expect(page.getSubmit()).toBeDisabled()
    );
  });
});
