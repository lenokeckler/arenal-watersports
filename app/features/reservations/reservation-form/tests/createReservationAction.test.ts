import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import { reportServerError } from "@/app/services/observability";
import { createReservationAction } from "../actions/createReservationAction";
import { createRentalReservation } from "../services/createRentalReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import {
  CASE_INSENSITIVE_DUPLICATE_EXTRA_IDS,
  CREATED_RESERVATION_ID,
  DUPLICATE_EXTRA_IDS,
  INVALID_EXTRA_ID,
  RESERVATION_OPERATION_ERROR,
  RESERVATION_UNIT_ID,
  VALID_RESERVATION_FORM_INPUT,
} from "./createReservationAction.constants";

vi.mock("../services/createRentalReservation", () => ({
  createRentalReservation: vi.fn(),
}));

vi.mock("@/app/services/observability", () => ({
  reportServerError: vi.fn(),
}));

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("createReservationAction", () => {
  const supabaseClient = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY
  );

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabaseClient);
  });

  it("returns the created reservation identifier", async () => {
    vi.mocked(createRentalReservation).mockResolvedValue(
      CREATED_RESERVATION_ID
    );

    await expect(
      createReservationAction(VALID_RESERVATION_FORM_INPUT)
    ).resolves.toEqual({
      ok: true,
      reservationId: CREATED_RESERVATION_ID,
    });
  });

  it("preserves operational RPC errors for server logging", async () => {
    vi.mocked(createRentalReservation).mockRejectedValue(
      RESERVATION_OPERATION_ERROR
    );

    await expect(
      createReservationAction(VALID_RESERVATION_FORM_INPUT)
    ).rejects.toBe(RESERVATION_OPERATION_ERROR);
    expect(reportServerError).toHaveBeenCalledOnce();
    expect(reportServerError).toHaveBeenCalledWith(
      RESERVATION_SERVICE_OPERATION.CREATE_RENTAL,
      RESERVATION_OPERATION_ERROR
    );
  });

  it("returns an unavailable unit field error after availability changes", async () => {
    vi.mocked(createRentalReservation).mockRejectedValue(
      new Error(
        RESERVATION_SERVICE_OPERATION.UNIT_UNAVAILABLE
      )
    );

    await expect(
      createReservationAction({
        ...VALID_RESERVATION_FORM_INPUT,
        unitId: RESERVATION_UNIT_ID,
      })
    ).resolves.toEqual({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.UNIT_ID]:
          RESERVATION_FORM_UI_COPY.UNIT_UNAVAILABLE,
      },
      unitUnavailable: true,
    });
  });

  it("returns a category field error when eligibility changes before save", async () => {
    vi.mocked(createRentalReservation).mockRejectedValue(
      new Error(
        RESERVATION_SERVICE_OPERATION.CATEGORY_UNAVAILABLE
      )
    );

    await expect(
      createReservationAction(VALID_RESERVATION_FORM_INPUT)
    ).resolves.toEqual({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.CATEGORY_ID]:
          RESERVATION_FORM_UI_COPY.CATEGORY_UNAVAILABLE,
      },
    });
  });

  it("explains when a concrete unit conflicts with another reservation", async () => {
    vi.mocked(createRentalReservation).mockRejectedValue(
      new Error(RESERVATION_SERVICE_OPERATION.UNIT_CONFLICT)
    );

    await expect(
      createReservationAction({
        ...VALID_RESERVATION_FORM_INPUT,
        unitId: RESERVATION_UNIT_ID,
      })
    ).resolves.toEqual({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.UNIT_ID]:
          RESERVATION_FORM_UI_COPY.UNIT_CONFLICT,
      },
      unitUnavailable: true,
    });
  });

  it.each([
    { extraIds: [INVALID_EXTRA_ID] },
    { extraIds: DUPLICATE_EXTRA_IDS },
    { extraIds: CASE_INSENSITIVE_DUPLICATE_EXTRA_IDS },
  ])(
    "rejects malformed or duplicate extra identifiers before authorization",
    async ({ extraIds }) => {
      const result = await createReservationAction({
        ...VALID_RESERVATION_FORM_INPUT,
        extraIds,
      });

      expect(result.ok).toBe(false);
      expect(
        getAuthorizedReservationFormClient
      ).not.toHaveBeenCalled();
      expect(
        createRentalReservation
      ).not.toHaveBeenCalled();
    }
  );
});
