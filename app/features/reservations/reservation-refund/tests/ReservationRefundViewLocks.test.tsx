import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_REASON as REASON_KEY } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY as REASON } from "../constants/ReservationRefundReasonCopy.constants";
import { RESERVATION_REFUND_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationRefundUnavailableCopy.constants";
import {
  BOTH_REFUND,
  EDITED_AMOUNT_TEXT,
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
  await page.typeAmount(EDITED_AMOUNT_TEXT);
  await page.selectRadio(REASON[REASON_KEY.CANCELLED_TRIP]);
};

describe("ReservationRefundView locks", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("disables the reason and currency radios while the refund is being sent", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockReturnValue(new Promise(() => undefined));
    const page = renderReservationRefundView(BOTH_REFUND);
    await fillValidForm(page);

    await page.submit();

    expect(
      page.getRadio(CURRENCY_NAME_COPY.USD)
    ).toBeDisabled();
    expect(
      page.getRadio(CURRENCY_NAME_COPY.CRC)
    ).toBeDisabled();
    expect(
      page.getRadio(REASON[REASON_KEY.OTHER])
    ).toBeDisabled();
  });

  it("keeps the unconfirmed alert when nothing is refundable after an unconfirmed send", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockRejectedValue(NETWORK_FAILURE);
    const page =
      renderReservationRefundView(USD_ONLY_REFUND);
    await fillValidForm(page);
    await page.submit();
    await page.findAlertText();

    act(() => page.rerender(NOTHING_REFUND));

    expect(page.getAlert()).toHaveTextContent(
      FEEDBACK.UNCONFIRMED
    );
    expect(page.queryText(UNAVAILABLE.TITLE)).toBeNull();
  });
});
