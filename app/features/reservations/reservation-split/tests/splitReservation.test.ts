import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createClient } from "@supabase/supabase-js";
import { API, SUPABASE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { Database } from "@/app/types";
import { RESERVATION_SPLIT_ERROR } from "../constants/ReservationSplitError.constants";
import { splitReservation } from "../services/splitReservation";
import {
  SPLIT_DEPARTURE_CODE,
  SPLIT_PAYLOAD,
  SPLIT_RPC_ERROR_BODY,
  SPLIT_RPC_ROWS,
  SPLIT_RPC_URL,
  SPLIT_BAD_REQUEST_STATUS,
  SPLIT_SUCCESS_STATUS,
} from "./splitReservation.constants";
import {
  SPLIT_DEPARTURE_ID,
  VALID_SPLIT_INPUT,
} from "./ReservationSplit.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("splitReservation", () => {
  const supabaseClient = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY
  );
  const respondWith = (
    body: unknown,
    status: number
  ): ReturnType<typeof vi.fn> => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify(body), { status })
      )
    );
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabaseClient
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends the snake_case payload and maps the created departures", async () => {
    const fetchMock = respondWith(
      SPLIT_RPC_ROWS,
      SPLIT_SUCCESS_STATUS
    );

    await expect(
      splitReservation(VALID_SPLIT_INPUT)
    ).resolves.toEqual([
      {
        code: SPLIT_DEPARTURE_CODE,
        reservationId: SPLIT_DEPARTURE_ID,
      },
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      SPLIT_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({ p_payload: SPLIT_PAYLOAD }),
        method: API.METHODS.POST,
      })
    );
  });

  it("throws when the database returns no departures", async () => {
    respondWith([], SPLIT_SUCCESS_STATUS);

    await expect(
      splitReservation(VALID_SPLIT_INPUT)
    ).rejects.toThrow(
      RESERVATION_SPLIT_ERROR.OPERATION.MISSING_DEPARTURES
    );
  });

  it("keeps the database message in the thrown error", async () => {
    respondWith(
      SPLIT_RPC_ERROR_BODY,
      SPLIT_BAD_REQUEST_STATUS
    );

    await expect(
      splitReservation(VALID_SPLIT_INPUT)
    ).rejects.toThrow(SPLIT_RPC_ERROR_BODY.message);
  });
});
