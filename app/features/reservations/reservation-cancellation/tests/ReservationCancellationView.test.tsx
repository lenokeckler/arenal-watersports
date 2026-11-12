import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import ReservationCancellationView from "../ReservationCancellationView";
import { cancelReservationAction } from "../actions/cancelReservationAction";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as COPY } from "../constants/ReservationCancellationFormCopy.constants";
import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationCancellationUnavailableCopy.constants";
import {
  CANCELLATION_REASON,
  EXPECTED_SCHEDULED,
} from "./ReservationCancellation.constants";
import { createReservationCancellationViewPage } from "./ReservationCancellationView.page";

vi.mock("../actions/cancelReservationAction", () => ({
  cancelReservationAction: vi.fn(),
}));

const CANCELLED_AFTER_REFRESH = {
  ...EXPECTED_SCHEDULED,
  isCancellable: false,
  status: RESERVATION_STATUS.CANCELLED,
};

const renderView = () => {
  const { rerender } = render(
    <ReservationCancellationView
      cancellation={EXPECTED_SCHEDULED}
    />
  );
  return {
    ...createReservationCancellationViewPage(),
    refreshAsCancelled: () =>
      rerender(
        <ReservationCancellationView
          cancellation={CANCELLED_AFTER_REFRESH}
        />
      ),
  };
};

describe("ReservationCancellationView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("explains what cancelling keeps and leaves the reason empty", () => {
    const page = renderView();

    expect(page.queryText(COPY.NOTE)).not.toBeNull();
    expect(page.getReason()).toHaveValue("");
    expect(page.getSubmit()).toBeEnabled();
  });

  it("asks for the reason, focuses it and sends nothing", async () => {
    const page = renderView();

    await page.typeReason("   ");
    await page.submit();

    expect(
      page.queryText(FEEDBACK.REASON_REQUIRED)
    ).not.toBeNull();
    expect(page.getReason()).toHaveFocus();
    expect(cancelReservationAction).not.toHaveBeenCalled();
  });

  it("cancels with the trimmed reason and the stale token, then confirms", async () => {
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: true,
      reservationId: EXPECTED_SCHEDULED.id,
    });
    const page = renderView();

    await page.typeReason(`  ${CANCELLATION_REASON} `);
    await page.submit();

    await waitFor(() =>
      expect(page.getStatusText()).toBe(
        COPY.SUCCESS(EXPECTED_SCHEDULED.code)
      )
    );
    expect(cancelReservationAction).toHaveBeenCalledWith({
      expectedUpdatedAt:
        EXPECTED_SCHEDULED.expectedUpdatedAt,
      reason: CANCELLATION_REASON,
      reservationId: EXPECTED_SCHEDULED.id,
    });
  });

  it("keeps the confirmation when the server refresh brings the cancelled reservation", async () => {
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: true,
      reservationId: EXPECTED_SCHEDULED.id,
    });
    const page = renderView();

    await page.typeReason(CANCELLATION_REASON);
    await page.submit();
    await waitFor(() =>
      expect(page.getStatusText()).toBe(
        COPY.SUCCESS(EXPECTED_SCHEDULED.code)
      )
    );
    page.refreshAsCancelled();

    expect(page.getStatusText()).toBe(
      COPY.SUCCESS(EXPECTED_SCHEDULED.code)
    );
    expect(
      page.queryText(
        UNAVAILABLE.BODY[RESERVATION_STATUS.CANCELLED]
      )
    ).toBeNull();
  });

  it("keeps the reason and disables the button when the reservation changed", async () => {
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: false,
      errors: {},
      formError: FEEDBACK.STALE,
    });
    const page = renderView();

    await page.typeReason(CANCELLATION_REASON);
    await page.submit();

    await waitFor(() =>
      expect(page.getAlertText()).toBe(FEEDBACK.STALE)
    );
    expect(page.getSubmit()).toBeDisabled();
    expect(page.getReason()).toHaveValue(
      CANCELLATION_REASON
    );
  });

  it("shows the generic failure when the action cannot be reached and allows a retry", async () => {
    vi.mocked(cancelReservationAction).mockRejectedValue(
      new Error("Failed to fetch")
    );
    const page = renderView();

    await page.typeReason(CANCELLATION_REASON);
    await page.submit();

    await waitFor(() =>
      expect(page.getAlertText()).toBe(
        FEEDBACK.SUBMIT_ERROR
      )
    );
    expect(page.getSubmit()).toBeEnabled();
  });

  it("shows a reason refused by the server under the field", async () => {
    vi.mocked(cancelReservationAction).mockResolvedValue({
      ok: false,
      errors: { reason: FEEDBACK.REASON_TOO_LONG },
    });
    const page = renderView();

    await page.typeReason(CANCELLATION_REASON);
    await page.submit();

    await waitFor(() =>
      expect(
        page.queryText(FEEDBACK.REASON_TOO_LONG)
      ).not.toBeNull()
    );
  });
});
