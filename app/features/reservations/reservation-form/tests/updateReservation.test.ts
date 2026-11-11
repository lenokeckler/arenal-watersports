import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { Database } from "@/app/types";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { updateReservation } from "../services/updateReservation";
import {
  BAD_REQUEST_STATUS,
  STALE_RPC_ERROR_BODY,
  SUCCESS_STATUS,
  UPDATED_RESERVATION_ID,
  UPDATE_RESERVATION_RPC_URL,
  VALIDATED_RESERVATION_EDIT_INPUT,
  VALIDATED_UNIT_RESERVATION_EDIT_INPUT,
} from "./updateReservation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("updateReservation", () => {
  const supabaseClient = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY
  );
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify(UPDATED_RESERVATION_ID),
          { status: SUCCESS_STATUS }
        )
      )
    );
    vi.stubGlobal("fetch", fetchMock);
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabaseClient
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends a category commitment with the token unchanged, microseconds included", async () => {
    const input = VALIDATED_RESERVATION_EDIT_INPUT;

    const reservationId = await updateReservation(input);

    expect(reservationId).toBe(UPDATED_RESERVATION_ID);
    expect(fetchMock).toHaveBeenCalledWith(
      UPDATE_RESERVATION_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({
          p_payload: {
            reservation_id: input.reservationId,
            people_count: input.peopleCount,
            time: input.time,
            duration_minutes: input.durationMinutes,
            expected_updated_at: input.expectedUpdatedAt,
            category_id:
              input.equipmentCommitment.categoryId,
            quantity: input.equipmentCommitment.quantity,
          },
        }),
      })
    );
  });

  it("sends a unit commitment with no category or quantity", async () => {
    const input = VALIDATED_UNIT_RESERVATION_EDIT_INPUT;

    await updateReservation(input);

    expect(fetchMock).toHaveBeenCalledWith(
      UPDATE_RESERVATION_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({
          p_payload: {
            reservation_id: input.reservationId,
            people_count: input.peopleCount,
            time: input.time,
            duration_minutes: input.durationMinutes,
            expected_updated_at: input.expectedUpdatedAt,
            unit_id: input.equipmentCommitment.unitId,
          },
        }),
      })
    );
  });

  it("keeps the database message when the RPC rejects", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(STALE_RPC_ERROR_BODY), {
        status: BAD_REQUEST_STATUS,
      })
    );

    const update = updateReservation(
      VALIDATED_RESERVATION_EDIT_INPUT
    );

    await expect(update).rejects.toThrow(
      SupabaseQueryError
    );
    await expect(update).rejects.toThrow(
      RESERVATION_SERVICE_OPERATION.RESERVATION_STALE
    );
  });

  it("fails when Supabase returns no identifier", async () => {
    fetchMock.mockResolvedValue(
      new Response("null", { status: SUCCESS_STATUS })
    );

    await expect(
      updateReservation(VALIDATED_RESERVATION_EDIT_INPUT)
    ).rejects.toThrow(
      RESERVATION_SERVICE_OPERATION.MISSING_UPDATED_ID
    );
  });
});
