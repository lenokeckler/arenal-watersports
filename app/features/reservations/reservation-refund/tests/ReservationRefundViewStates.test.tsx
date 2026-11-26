import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as REASON_KEY } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY as REASON } from "../constants/ReservationRefundReasonCopy.constants";
import { RESERVATION_REFUND_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationRefundUnavailableCopy.constants";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import {
  FULL_AMOUNT_TEXT,
  NETWORK_FAILURE,
  NOTHING_REFUND,
  USD_ONLY_REFUND,
} from "./ReservationRefundForm.constants";
import { renderReservationRefundView } from "./renderReservationRefundView";

vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

const fillValidForm = async (
  page: ReturnType<typeof renderReservationRefundView>
) => {
  await page.typeAmount(FULL_AMOUNT_TEXT);
  await page.selectRadio(REASON[REASON_KEY.CANCELLED_TRIP]);
};

describe("ReservationRefundView states", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("locks every field while the refund is being sent", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockReturnValue(new Promise(() => undefined));
    const page =
      renderReservationRefundView(USD_ONLY_REFUND);
    await fillValidForm(page);

    await page.submit();

    expect(page.getBusy()).toBe("true");
    expect(page.getSubmit()).toBeDisabled();
    expect(page.getSubmit()).toHaveTextContent(
      COPY.SUBMITTING
    );
    expect(page.getAmount()).toBeDisabled();
  });

  it("focuses the alert and keeps the submit locked after an unconfirmed failure", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockRejectedValue(NETWORK_FAILURE);
    const page =
      renderReservationRefundView(USD_ONLY_REFUND);
    await fillValidForm(page);

    await page.submit();

    expect(await page.findAlertText()).toBe(
      FEEDBACK.UNCONFIRMED
    );
    expect(page.getAlert()).toHaveFocus();
    expect(page.getSubmit()).toBeDisabled();
  });

  it("shows the receipt, not the unavailable box, after a full refund", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    const page =
      renderReservationRefundView(USD_ONLY_REFUND);
    await fillValidForm(page);
    await page.submit();
    await page.findStatusText();

    act(() => page.rerender(NOTHING_REFUND));

    expect(page.queryText(UNAVAILABLE.TITLE)).toBeNull();
    expect(
      page.queryText(COPY.SUCCESS(NOTHING_REFUND.code))
    ).not.toBeNull();
  });

  it("shows the unavailable box and no form when nothing can be refunded", () => {
    const page =
      renderReservationRefundView(NOTHING_REFUND);

    expect(
      page.queryText(UNAVAILABLE.TITLE)
    ).not.toBeNull();
    expect(page.queryText(UNAVAILABLE.RULE)).not.toBeNull();
    expect(page.querySubmit()).toBeNull();
  });

  it("links back to the reservation", () => {
    const page =
      renderReservationRefundView(USD_ONLY_REFUND);

    expect(page.getBackHref()).toBe(
      PATHS.RESERVATIONS.DETAIL(USD_ONLY_REFUND.id)
    );
  });
});
