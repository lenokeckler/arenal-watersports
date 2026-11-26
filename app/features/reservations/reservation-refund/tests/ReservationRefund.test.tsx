import { render } from "@testing-library/react";
import { notFound } from "next/navigation";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationRefund from "../ReservationRefund";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { getReservationRefund } from "../services/getReservationRefund";
import { REFUND_RESERVATION_ID } from "./ReservationRefund.constants";
import { BOTH_REFUND } from "./ReservationRefundForm.constants";
import {
  SCREEN_ACCESS_REDIRECT,
  SCREEN_NOT_FOUND,
} from "./ReservationRefundScreen.constants";
import { createReservationRefundViewPage } from "./ReservationRefundView.page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(SCREEN_NOT_FOUND);
  }),
}));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/getReservationRefund", () => ({
  getReservationRefund: vi.fn(),
}));

const renderEntry = () =>
  ReservationRefund({
    reservationId: REFUND_RESERVATION_ID,
  });

describe("ReservationRefund", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      assertReservationCalendarAccess
    ).mockResolvedValue(undefined);
  });

  it("checks reservations access before reading", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(SCREEN_ACCESS_REDIRECT);

    await expect(renderEntry()).rejects.toBe(
      SCREEN_ACCESS_REDIRECT
    );
    expect(getReservationRefund).not.toHaveBeenCalled();
  });

  it("reads the reservation that the route names", async () => {
    vi.mocked(getReservationRefund).mockResolvedValue(
      BOTH_REFUND
    );

    await renderEntry();

    expect(getReservationRefund).toHaveBeenCalledWith(
      REFUND_RESERVATION_ID
    );
  });

  it("answers not found for an unknown reservation", async () => {
    vi.mocked(getReservationRefund).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow(
      SCREEN_NOT_FOUND
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("shows the refund screen for the read reservation", async () => {
    vi.mocked(getReservationRefund).mockResolvedValue(
      BOTH_REFUND
    );

    render(await renderEntry());
    const page = createReservationRefundViewPage();

    expect(page.queryText(BOTH_REFUND.code)).not.toBeNull();
    expect(page.getSubmit()).toHaveTextContent(COPY.SUBMIT);
  });
});
