import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { revalidatePath } from "next/cache";
import { resolveReservationEditPath } from "@/app/utils/reservations/resolveReservationEditPath";
import { updateReservationAction } from "../actions/updateReservationAction";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { updateReservation } from "../services/updateReservation";
import {
  RESERVATION_EDIT_TEST,
  VALID_RESERVATION_EDIT_INPUT,
} from "./ReservationEdit.constants";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("../services/updateReservation", () => ({
  updateReservation: vi.fn(),
}));
vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("updateReservationAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("refuses a malformed payload", async () => {
    await expect(
      updateReservationAction({
        ...VALID_RESERVATION_EDIT_INPUT,
        reservationId: RESERVATION_EDIT_TEST.MALFORMED_ID,
      })
    ).resolves.toEqual({
      errors: {},
      formError: RESERVATION_EDIT_COPY.SUBMIT_ERROR,
      ok: false,
    });
    expect(updateReservation).not.toHaveBeenCalled();
  });

  it("returns the field errors of an invalid edit", async () => {
    await expect(
      updateReservationAction({
        ...VALID_RESERVATION_EDIT_INPUT,
        peopleCount: 0,
      })
    ).resolves.toEqual({
      errors: {
        [RESERVATION_FORM_FIELD.PEOPLE_COUNT]:
          RESERVATION_FORM_COPY[
            RESERVATION_FORM_FIELD.PEOPLE_COUNT
          ],
      },
      ok: false,
    });
  });

  it("passes the token along and revalidates the edit screen", async () => {
    vi.mocked(updateReservation).mockResolvedValue(
      RESERVATION_EDIT_TEST.RESERVATION_ID
    );

    await expect(
      updateReservationAction(VALID_RESERVATION_EDIT_INPUT)
    ).resolves.toEqual({
      ok: true,
      reservationId: RESERVATION_EDIT_TEST.RESERVATION_ID,
    });
    expect(updateReservation).toHaveBeenCalledWith(
      expect.objectContaining({
        expectedUpdatedAt:
          RESERVATION_EDIT_TEST.MICROSECOND_INSTANT,
      })
    );
    expect(revalidatePath).toHaveBeenCalledWith(
      resolveReservationEditPath(
        RESERVATION_EDIT_TEST.RESERVATION_ID
      )
    );
  });

  it("does not revalidate a stale edit", async () => {
    vi.mocked(updateReservation).mockRejectedValue(
      new Error(
        RESERVATION_SERVICE_OPERATION.RESERVATION_STALE
      )
    );

    await expect(
      updateReservationAction(VALID_RESERVATION_EDIT_INPUT)
    ).resolves.toMatchObject({
      formError: RESERVATION_EDIT_COPY.STALE,
      ok: false,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
