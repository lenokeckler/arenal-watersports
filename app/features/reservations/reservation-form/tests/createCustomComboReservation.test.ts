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
import { createCustomComboReservation } from "../services/createCustomComboReservation";
import {
  BAD_REQUEST_STATUS,
  CREATED_CUSTOM_COMBO_RESERVATION_ID,
  CREATE_CUSTOM_COMBO_RESERVATION_RPC_URL,
  CUSTOM_COMBO_RESERVATION_OPERATION,
  CUSTOM_COMBO_RPC_ERROR_BODY,
  SUCCESS_STATUS,
  VALIDATED_CUSTOM_COMBO_RESERVATION_INPUT,
} from "./createCustomComboReservation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("createCustomComboReservation", () => {
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
            CREATED_CUSTOM_COMBO_RESERVATION_ID
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

  it("persists all selected categories, guides, and agreed prices in one RPC payload", async () => {
    await expect(
      createCustomComboReservation(
        VALIDATED_CUSTOM_COMBO_RESERVATION_INPUT
      )
    ).resolves.toBe(CREATED_CUSTOM_COMBO_RESERVATION_ID);
    expect(fetchMock).toHaveBeenCalledWith(
      CREATE_CUSTOM_COMBO_RESERVATION_RPC_URL,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          p_payload: {
            agreed_amount_crc: 30000,
            agreed_amount_usd: 60,
            customer_name: "Combo Customer",
            date: "2030-06-15",
            duration_minutes: 90,
            guide_ids: [],
            items: [
              {
                category_id:
                  VALIDATED_CUSTOM_COMBO_RESERVATION_INPUT
                    .items[0].categoryId,
                quantity: 2,
              },
              {
                category_id:
                  VALIDATED_CUSTOM_COMBO_RESERVATION_INPUT
                    .items[1].categoryId,
                quantity: 1,
              },
            ],
            people_count: 3,
            time: "09:30",
          },
        }),
      })
    );
  });

  it("preserves the RPC operation context when persistence fails", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify(CUSTOM_COMBO_RPC_ERROR_BODY),
        {
          status: BAD_REQUEST_STATUS,
        }
      )
    );
    const creation = createCustomComboReservation(
      VALIDATED_CUSTOM_COMBO_RESERVATION_INPUT
    );

    await expect(creation).rejects.toThrow(
      SupabaseQueryError
    );
    await expect(creation).rejects.toThrow(
      CUSTOM_COMBO_RESERVATION_OPERATION
    );
  });

  it("rejects a successful RPC response without a reservation identifier", async () => {
    fetchMock.mockResolvedValue(new Response("null"));

    await expect(
      createCustomComboReservation(
        VALIDATED_CUSTOM_COMBO_RESERVATION_INPUT
      )
    ).rejects.toThrow("no identifier");
  });
});
