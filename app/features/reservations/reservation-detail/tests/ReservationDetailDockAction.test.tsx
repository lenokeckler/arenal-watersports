import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ARIA_ROLE,
  RESERVATION_STATUS,
} from "@/app/constants";
import { submitReservationDockNotice } from "../actions/submitReservationDockNotice";
import ReservationDetailDockAction from "../components/ReservationDetailDockAction";
import { RESERVATION_DOCK_NOTICE_COPY } from "../constants/ReservationDockNotice.constants";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";

vi.mock("../actions/submitReservationDockNotice", () => ({
  submitReservationDockNotice: vi.fn(),
}));

const NOTIFIED_AT = "2026-10-20T15:00:00.000Z";

const renderAction = (
  status: string,
  dockNotifiedAt: string | null = null
) =>
  render(
    <ReservationDetailDockAction
      dockNotifiedAt={dockNotifiedAt}
      reservationId={RESERVATION_DETAIL_TEST.RESERVATION_ID}
      status={status}
    />
  );

describe("ReservationDetailDockAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      submitReservationDockNotice
    ).mockResolvedValue({
      isOk: true,
    });
  });

  it.each([
    RESERVATION_STATUS.SCHEDULED,
    RESERVATION_STATUS.DISPATCHED,
  ])(
    "offers to send the reservation to the dock when %s",
    (status) => {
      renderAction(status);

      expect(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: RESERVATION_DOCK_NOTICE_COPY.SEND,
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          RESERVATION_DOCK_NOTICE_COPY.SENT
        )
      ).not.toBeInTheDocument();
    }
  );

  it.each([
    RESERVATION_STATUS.CANCELLED,
    RESERVATION_STATUS.CLOSED,
  ])("offers nothing when %s", (status) => {
    renderAction(status);

    expect(
      screen.queryByRole(ARIA_ROLE.BUTTON)
    ).not.toBeInTheDocument();
  });

  it("says the reservation was sent and offers to take the notice back", () => {
    renderAction(RESERVATION_STATUS.SCHEDULED, NOTIFIED_AT);

    expect(
      screen.getByText(RESERVATION_DOCK_NOTICE_COPY.SENT)
    ).toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_DOCK_NOTICE_COPY.REMOVE,
      })
    ).toBeInTheDocument();
  });

  it("sends the notice for the reservation", async () => {
    renderAction(RESERVATION_STATUS.SCHEDULED);

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_DOCK_NOTICE_COPY.SEND,
      })
    );

    expect(
      submitReservationDockNotice
    ).toHaveBeenCalledWith({
      isNotified: true,
      reservationId: RESERVATION_DETAIL_TEST.RESERVATION_ID,
    });
  });

  it("takes the notice back", async () => {
    renderAction(RESERVATION_STATUS.SCHEDULED, NOTIFIED_AT);

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_DOCK_NOTICE_COPY.REMOVE,
      })
    );

    expect(
      submitReservationDockNotice
    ).toHaveBeenCalledWith({
      isNotified: false,
      reservationId: RESERVATION_DETAIL_TEST.RESERVATION_ID,
    });
  });

  it("says so when the notice fails", async () => {
    vi.mocked(
      submitReservationDockNotice
    ).mockResolvedValue({
      isOk: false,
    });
    renderAction(RESERVATION_STATUS.SCHEDULED);

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_DOCK_NOTICE_COPY.SEND,
      })
    );

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(RESERVATION_DOCK_NOTICE_COPY.ERROR);
  });
});
