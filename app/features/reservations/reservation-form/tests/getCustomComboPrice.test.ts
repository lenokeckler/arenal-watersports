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
import { getCustomComboPrice } from "../services/getCustomComboPrice";
import { CUSTOM_COMBO_PRICING_ACTION_TEST } from "./getCustomComboPricingAction.constants";
import { CUSTOM_COMBO_PRICE_SERVICE_TEST } from "./getCustomComboPrice.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("getCustomComboPrice", () => {
  const supabaseClient = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY
  );
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabaseClient
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  it("returns no price when the tariff query has no rows", async () => {
    fetchMock.mockResolvedValue(
      new Response("[]", {
        status:
          CUSTOM_COMBO_PRICE_SERVICE_TEST.SUCCESS_STATUS,
      })
    );

    await expect(
      getCustomComboPrice(
        CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
      )
    ).resolves.toBeNull();
  });

  it("maps a tariff row to the custom combo price", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify([
          CUSTOM_COMBO_PRICE_SERVICE_TEST.PRICING_ROW,
        ]),
        {
          status:
            CUSTOM_COMBO_PRICE_SERVICE_TEST.SUCCESS_STATUS,
        }
      )
    );

    await expect(
      getCustomComboPrice(
        CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
      )
    ).resolves.toEqual({
      listAmountCrc:
        CUSTOM_COMBO_PRICE_SERVICE_TEST.PRICING_ROW
          .list_amount_crc,
      listAmountUsd:
        CUSTOM_COMBO_PRICE_SERVICE_TEST.PRICING_ROW
          .list_amount_usd,
    });
  });

  it("preserves actual RPC failures as service errors", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify(
          CUSTOM_COMBO_PRICE_SERVICE_TEST.RPC_ERROR
        ),
        {
          status:
            CUSTOM_COMBO_PRICE_SERVICE_TEST.SERVER_ERROR_STATUS,
        }
      )
    );

    await expect(
      getCustomComboPrice(
        CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
      )
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
