import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { CURRENCY_CODE, PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { recordReservationDepositAction } from "../actions/recordReservationDepositAction";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as COPY } from "../constants/ReservationDepositFeedbackCopy.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY } from "../constants/ReservationDepositValidationCopy.constants";
import { recordReservationDeposit } from "../services/recordReservationDeposit";
import { DEPOSIT_RESERVATION_ID } from "./ReservationDeposit.constants";
import { RECEIVED_RECORDED } from "./ReservationDepositAction.constants";
import {
  DECLINED_DEPOSIT_INPUT,
  RECEIVED_DEPOSIT_INPUT,
} from "./ReservationDepositValues.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({ assertReservationCalendarAccess: vi.fn() })
);
vi.mock("../services/recordReservationDeposit", () => ({
  recordReservationDeposit: vi.fn(),
}));

describe("recordReservationDepositAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("records the deposit and revalidates the detail and the pending list", async () => {
    vi.mocked(recordReservationDeposit).mockResolvedValue(
      RECEIVED_RECORDED
    );

    await expect(
      recordReservationDepositAction(RECEIVED_DEPOSIT_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: RECEIVED_RECORDED,
    });
    expect(
      assertReservationCalendarAccess
    ).toHaveBeenCalledOnce();
    expect(recordReservationDeposit).toHaveBeenCalledWith({
      amount: 200,
      currency: CURRENCY_CODE.USD,
      hasDeposit: true,
      reservationId: DEPOSIT_RESERVATION_ID,
    });
    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.DETAIL(DEPOSIT_RESERVATION_ID)
    );
    expect(revalidatePath).toHaveBeenCalledWith(
      PATHS.RESERVATIONS.DEPOSITS
    );
  });

  it("records the no deposit answer ignoring the amount", async () => {
    await recordReservationDepositAction(
      DECLINED_DEPOSIT_INPUT
    );

    expect(recordReservationDeposit).toHaveBeenCalledWith({
      hasDeposit: false,
      reservationId: DEPOSIT_RESERVATION_ID,
    });
  });

  it("refuses a malformed input before checking access", async () => {
    await expect(
      recordReservationDepositAction({})
    ).resolves.toEqual({
      ok: false,
      errors: {},
      formError: COPY.REQUEST_REJECTED,
    });
    expect(
      assertReservationCalendarAccess
    ).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("returns the amount error without calling the service", async () => {
    await expect(
      recordReservationDepositAction({
        ...RECEIVED_DEPOSIT_INPUT,
        amountText: "",
      })
    ).resolves.toEqual({
      ok: false,
      errors: {
        amount:
          RESERVATION_DEPOSIT_VALIDATION_COPY.AMOUNT_REQUIRED,
      },
    });
    expect(recordReservationDeposit).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
