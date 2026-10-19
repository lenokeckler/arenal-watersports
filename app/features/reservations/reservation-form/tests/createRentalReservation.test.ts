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
import { createRentalReservation } from "../services/createRentalReservation";
import {
  CREATED_RESERVATION_ID,
  CREATE_RESERVATION_RPC_URL,
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

  it("sends category and quantity in one JSON payload", async () => {
    const reservationId = await createRentalReservation(
      VALIDATED_RESERVATION_INPUT
    );

    expect(reservationId).toBe(CREATED_RESERVATION_ID);
    expect(fetchMock).toHaveBeenCalledWith(
      CREATE_RESERVATION_RPC_URL,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          p_payload: {
            customer_name:
              VALIDATED_RESERVATION_INPUT.customerName,
            date: VALIDATED_RESERVATION_INPUT.date,
            duration_minutes:
              VALIDATED_RESERVATION_INPUT.durationMinutes,
            guide_ids: [],
            people_count:
              VALIDATED_RESERVATION_INPUT.peopleCount,
            reservation_type:
              VALIDATED_RESERVATION_INPUT.reservationType,
            time: VALIDATED_RESERVATION_INPUT.time,
            category_id:
              VALIDATED_RESERVATION_INPUT
                .equipmentCommitment.categoryId,
            quantity:
              VALIDATED_RESERVATION_INPUT
                .equipmentCommitment.quantity,
          },
        }),
      })
    );
  });
});
