import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { recordReservationCharge } from "../services/recordReservationCharge";
import {
  CHARGE_ACCESS_REDIRECT,
  CHARGE_RECORDED,
  MIXED_CHARGE_COMMAND,
} from "./ReservationChargeAction.constants";
import { SECOND_AMOUNT_TEXT_CASES } from "./ReservationChargeMixed.constants";
import { MIXED_CHARGE_INPUT } from "./ReservationChargeValues.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/recordReservationCharge", () => ({
  recordReservationCharge: vi.fn(),
}));

describe("recordReservationChargeAction mixed", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("sends both parts to the service", async () => {
    vi.mocked(recordReservationCharge).mockResolvedValue(
      CHARGE_RECORDED
    );

    await recordReservationChargeAction(MIXED_CHARGE_INPUT);

    expect(recordReservationCharge).toHaveBeenCalledWith(
      MIXED_CHARGE_COMMAND
    );
  });

  it("returns the second amount error without calling the service", async () => {
    await expect(
      recordReservationChargeAction({
        ...MIXED_CHARGE_INPUT,
        secondAmountText: SECOND_AMOUNT_TEXT_CASES.EMPTY,
      })
    ).resolves.toEqual({
      ok: false,
      errors: { secondAmount: COPY.AMOUNT_REQUIRED },
    });
    expect(recordReservationCharge).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("checks access before reading the second amount", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(CHARGE_ACCESS_REDIRECT);

    await expect(
      recordReservationChargeAction({
        ...MIXED_CHARGE_INPUT,
        secondAmountText: SECOND_AMOUNT_TEXT_CASES.FORMAT,
      })
    ).rejects.toBe(CHARGE_ACCESS_REDIRECT);
  });
});
