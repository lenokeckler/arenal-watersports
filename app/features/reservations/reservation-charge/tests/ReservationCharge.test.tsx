import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { notFound } from "next/navigation";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import ReservationCharge from "../ReservationCharge";
import { RESERVATION_CHARGE_UI_COPY as COPY } from "../constants/ReservationChargeUiCopy.constants";
import { RESERVATION_CHARGE_UNAVAILABLE_COPY as UNAVAILABLE } from "../constants/ReservationChargeUnavailableCopy.constants";
import { getReservationCharge } from "../services/getReservationCharge";
import {
  CHARGE_RESERVATION_ID,
  EXPECTED_SCHEDULED,
} from "./ReservationCharge.constants";
import { createReservationChargePage } from "./ReservationCharge.page";
import {
  CHARGEABLE_CHARGES,
  EXPECTED_CANCELLED,
  EXPECTED_SPLIT_CHILD,
  SCREEN_ACCESS_REDIRECT,
  SCREEN_NOT_FOUND,
} from "./ReservationChargeScreen.constants";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error(SCREEN_NOT_FOUND);
  }),
}));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/getReservationCharge", () => ({
  getReservationCharge: vi.fn(),
}));

const renderEntry = () =>
  ReservationCharge({
    reservationId: CHARGE_RESERVATION_ID,
  });

describe("ReservationCharge", () => {
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
    expect(getReservationCharge).not.toHaveBeenCalled();
  });

  it("reads the reservation that the route names", async () => {
    vi.mocked(getReservationCharge).mockResolvedValue(
      EXPECTED_SCHEDULED
    );

    await renderEntry();

    expect(getReservationCharge).toHaveBeenCalledWith(
      CHARGE_RESERVATION_ID
    );
  });

  it("answers not found for an unknown reservation", async () => {
    vi.mocked(getReservationCharge).mockResolvedValue(null);

    await expect(renderEntry()).rejects.toThrow(
      SCREEN_NOT_FOUND
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it.each(CHARGEABLE_CHARGES)(
    "shows the charge screen for a $status reservation",
    async (charge) => {
      vi.mocked(getReservationCharge).mockResolvedValue(
        charge
      );

      render(await renderEntry());
      const page = createReservationChargePage();

      expect(
        page.getHeading(COPY.TITLE)
      ).toBeInTheDocument();
      expect(page.queryText(charge.code)).not.toBeNull();
      expect(page.queryStatus()).toBeNull();
    }
  );

  it("blocks a cancelled reservation", async () => {
    vi.mocked(getReservationCharge).mockResolvedValue(
      EXPECTED_CANCELLED
    );

    render(await renderEntry());
    const page = createReservationChargePage();

    expect(page.getStatusText()).toContain(
      UNAVAILABLE.BODY.cancelled
    );
    expect(
      page.queryText(EXPECTED_CANCELLED.code)
    ).toBeNull();
  });

  it("blocks a split child", async () => {
    vi.mocked(getReservationCharge).mockResolvedValue(
      EXPECTED_SPLIT_CHILD
    );

    render(await renderEntry());
    const page = createReservationChargePage();

    expect(page.getStatusText()).toContain(
      UNAVAILABLE.BODY.split_child
    );
    expect(
      page.queryText(EXPECTED_SPLIT_CHILD.code)
    ).toBeNull();
  });
});
