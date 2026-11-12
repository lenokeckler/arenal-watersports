import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_ERROR } from "../constants/ReservationChargeError.constants";
import { RESERVATION_CHARGE_FEEDBACK_COPY as COPY } from "../constants/ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { recordReservationCharge } from "../services/recordReservationCharge";
import { CHARGE_RESERVATION_ID } from "./ReservationCharge.constants";
import {
  CHARGE_ACCESS_REDIRECT,
  CHARGE_RECORDED,
  CHARGE_UNEXPECTED_ERROR,
  VALID_CHARGE_COMMAND,
} from "./ReservationChargeAction.constants";
import { VALID_CHARGE_INPUT } from "./ReservationChargeValues.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/recordReservationCharge", () => ({
  recordReservationCharge: vi.fn(),
}));

describe("recordReservationChargeAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("records the charge and revalidates detail and income", async () => {
    vi.mocked(recordReservationCharge).mockResolvedValue(
      CHARGE_RECORDED
    );

    await expect(
      recordReservationChargeAction(VALID_CHARGE_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: CHARGE_RECORDED,
    });
    expect(recordReservationCharge).toHaveBeenCalledWith(
      VALID_CHARGE_COMMAND
    );
    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.DETAIL(CHARGE_RESERVATION_ID)
    );
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.INCOME
    );
  });

  it("refuses a malformed input before checking access", async () => {
    await expect(
      recordReservationChargeAction({})
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.GENERIC,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
  });

  it("returns the field errors without calling the service", async () => {
    await expect(
      recordReservationChargeAction({
        ...VALID_CHARGE_INPUT,
        amountText: "",
        paymentMethod: " ",
      })
    ).resolves.toEqual({
      ok: false,
      errors: {
        amount:
          RESERVATION_CHARGE_VALIDATION_COPY.AMOUNT_REQUIRED,
        paymentMethod:
          RESERVATION_CHARGE_VALIDATION_COPY.METHOD_REQUIRED,
      },
    });
    expect(recordReservationCharge).not.toHaveBeenCalled();
  });

  it("maps a database refusal without revalidating", async () => {
    vi.mocked(recordReservationCharge).mockRejectedValue(
      new Error(
        RESERVATION_CHARGE_ERROR.MESSAGE.NOT_CHARGEABLE
      )
    );

    await expect(
      recordReservationChargeAction(VALID_CHARGE_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.STATUS_CHANGED,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("rethrows an unexpected failure for server logging", async () => {
    vi.mocked(recordReservationCharge).mockRejectedValue(
      CHARGE_UNEXPECTED_ERROR
    );

    await expect(
      recordReservationChargeAction(VALID_CHARGE_INPUT)
    ).rejects.toBe(CHARGE_UNEXPECTED_ERROR);
  });

  it("lets an access redirect through without recording", async () => {
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(CHARGE_ACCESS_REDIRECT);

    await expect(
      recordReservationChargeAction(VALID_CHARGE_INPUT)
    ).rejects.toBe(CHARGE_ACCESS_REDIRECT);
    expect(recordReservationCharge).not.toHaveBeenCalled();
  });
});
