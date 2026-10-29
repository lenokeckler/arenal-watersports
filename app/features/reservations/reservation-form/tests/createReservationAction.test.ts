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
import { createReservationAction } from "../actions/createReservationAction";
import { createRentalReservation } from "../services/createRentalReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import {
  CASE_INSENSITIVE_DUPLICATE_EXTRA_IDS,
  CREATED_RESERVATION_ID,
  DUPLICATE_EXTRA_IDS,
  INVALID_EXTRA_ID,
  RESERVATION_OPERATION_ERROR,
  VALID_RESERVATION_FORM_INPUT,
} from "./createReservationAction.constants";

vi.mock("../services/createRentalReservation", () => ({
  createRentalReservation: vi.fn(),
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
