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
import { createRentalReservation } from "../services/createRentalReservation";
import {
  BAD_REQUEST_STATUS,
  CREATED_RESERVATION_ID,
  CREATE_RESERVATION_RPC_URL,
  RPC_ERROR_BODY,
  SUCCESS_STATUS,
  VALIDATED_RESERVATION_INPUT,
} from "./createRentalReservation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("createRentalReservation", () => {
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
          JSON.stringify(CREATED_RESERVATION_ID),
          {
            status: SUCCESS_STATUS,
          }
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

  it("sends only the supported reservation fields to the RPC", async () => {
    const reservationId = await createRentalReservation(
      VALIDATED_RESERVATION_INPUT
    );

    expect(reservationId).toBe(CREATED_RESERVATION_ID);
    expect(fetchMock).toHaveBeenCalledWith(
      CREATE_RESERVATION_RPC_URL,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          p_category_id:
            VALIDATED_RESERVATION_INPUT.categoryId,
          p_customer_name:
            VALIDATED_RESERVATION_INPUT.customerName,
          p_date: VALIDATED_RESERVATION_INPUT.date,
          p_duration_minutes:
            VALIDATED_RESERVATION_INPUT.durationMinutes,
          p_people_count:
            VALIDATED_RESERVATION_INPUT.peopleCount,
          p_quantity: VALIDATED_RESERVATION_INPUT.quantity,
          p_time: VALIDATED_RESERVATION_INPUT.time,
        }),
      })
    );
  });

  it("preserves Supabase operation context when the RPC rejects", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(RPC_ERROR_BODY), {
        status: BAD_REQUEST_STATUS,
      })
    );

    const creation = createRentalReservation(
      VALIDATED_RESERVATION_INPUT
    );

    await expect(creation).rejects.toThrow(
      SupabaseQueryError
    );
    await expect(creation).rejects.toThrow(
      "create rental reservation"
    );
  });

  it("rejects a successful response without the reservation id", async () => {
    fetchMock.mockResolvedValue(new Response("null"));

    await expect(
      createRentalReservation(VALIDATED_RESERVATION_INPUT)
    ).rejects.toThrow("no identifier");
  });
});
