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
import { createPredefinedComboReservation } from "../services/createPredefinedComboReservation";
import {
  BAD_REQUEST_STATUS,
  CREATED_PREDEFINED_COMBO_RESERVATION_ID,
  CREATE_PREDEFINED_COMBO_RESERVATION_RPC_URL,
  PREDEFINED_COMBO_RESERVATION_OPERATION,
  PREDEFINED_COMBO_RPC_ERROR_BODY,
  SUCCESS_STATUS,
  VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT,
} from "./createPredefinedComboReservation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("createPredefinedComboReservation", () => {
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
          JSON.stringify(
            CREATED_PREDEFINED_COMBO_RESERVATION_ID
          ),
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

  it("sends only the combo identifier and reservation details to the atomic RPC", async () => {
    await expect(
      createPredefinedComboReservation(
        VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT
      )
    ).resolves.toBe(
      CREATED_PREDEFINED_COMBO_RESERVATION_ID
    );
    expect(fetchMock).toHaveBeenCalledWith(
      CREATE_PREDEFINED_COMBO_RESERVATION_RPC_URL,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          p_payload: {
            combo_id:
              VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT.comboId,
            customer_name:
              VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT.customerName,
            date: VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT.date,
            duration_minutes:
              VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT.durationMinutes,
            guide_ids:
              VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT.guideIds,
            people_count:
              VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT.peopleCount,
            time: VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT.time,
          },
        }),
      })
    );
  });

  it("preserves the RPC operation context when persistence fails", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify(PREDEFINED_COMBO_RPC_ERROR_BODY),
        {
          status: BAD_REQUEST_STATUS,
        }
      )
    );

    await expect(
      createPredefinedComboReservation(
        VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT
      )
    ).rejects.toThrow(SupabaseQueryError);
    await expect(
      createPredefinedComboReservation(
        VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT
      )
    ).rejects.toThrow(
      PREDEFINED_COMBO_RESERVATION_OPERATION
    );
  });

  it("rejects an RPC response without a reservation identifier", async () => {
    fetchMock.mockResolvedValue(new Response("null"));

    await expect(
      createPredefinedComboReservation(
        VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT
      )
    ).rejects.toThrow("no identifier");
  });
});
