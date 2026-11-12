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
  CREATE_RESERVATION_RPC_URL,
  RPC_ERROR_BODY,
  SUCCESS_STATUS,
  VALIDATED_RESERVATION_INPUT,
} from "./createRentalReservation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("createRentalReservation errors", () => {
  const supabaseClient = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY
  );
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response("null", { status: SUCCESS_STATUS })
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
    expect(fetchMock).toHaveBeenCalledWith(
      CREATE_RESERVATION_RPC_URL,
      expect.any(Object)
    );
  });
});
