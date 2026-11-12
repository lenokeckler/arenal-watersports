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
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_ERROR } from "../constants/ReservationPostponementError.constants";
import { postponeReservation } from "../services/postponeReservation";
import { POSTPONEMENT_RESERVATION_ID } from "./ReservationPostponement.constants";
import { UNDECLARED_KEY } from "./isReservationPostponementInput.constants";
import { VALID_POSTPONEMENT_INPUT } from "./ReservationPostponementInput.constants";
import {
  POSTPONE_BAD_REQUEST_STATUS,
  POSTPONE_NULL_READING_PAYLOAD,
  POSTPONE_PADDED_REASON,
  POSTPONE_PAYLOAD,
  POSTPONE_RPC_ERROR_BODY,
  POSTPONE_RPC_RESULT,
  POSTPONE_RPC_URL,
  POSTPONE_SUCCESS_STATUS,
  POSTPONE_ZERO_READING_PAYLOAD,
} from "./postponeReservation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("postponeReservation", () => {
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

  it("sends the snake_case payload and returns the reservation id", async () => {
    const fetchMock = respondWith(
      POSTPONE_RPC_RESULT,
      POSTPONE_SUCCESS_STATUS
    );

    await expect(
      postponeReservation(VALID_POSTPONEMENT_INPUT)
    ).resolves.toBe(POSTPONEMENT_RESERVATION_ID);
    expect(fetchMock).toHaveBeenCalledWith(
      POSTPONE_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({
          p_payload: POSTPONE_PAYLOAD,
        }),
        method: API.METHODS.POST,
      })
    );
  });

  it("sends a missing measure as null", async () => {
    const fetchMock = respondWith(
      POSTPONE_RPC_RESULT,
      POSTPONE_SUCCESS_STATUS
    );

    await postponeReservation({
      ...VALID_POSTPONEMENT_INPUT,
      readings: [
        {
          itemId:
            VALID_POSTPONEMENT_INPUT.readings[0].itemId,
          fuelIn: undefined,
          usageIn: null,
        },
      ],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      POSTPONE_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({
          p_payload: {
            ...POSTPONE_PAYLOAD,
            readings: [POSTPONE_NULL_READING_PAYLOAD],
          },
        }),
      })
    );
  });

  it("drops undeclared keys from the payload", async () => {
    const fetchMock = respondWith(
      POSTPONE_RPC_RESULT,
      POSTPONE_SUCCESS_STATUS
    );

    await postponeReservation({
      ...VALID_POSTPONEMENT_INPUT,
      [UNDECLARED_KEY]: true,
    } as typeof VALID_POSTPONEMENT_INPUT);

    expect(fetchMock).toHaveBeenCalledWith(
      POSTPONE_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({
          p_payload: POSTPONE_PAYLOAD,
        }),
      })
    );
  });

  it("sends the reason untrimmed for the database to trim", async () => {
    const fetchMock = respondWith(
      POSTPONE_RPC_RESULT,
      POSTPONE_SUCCESS_STATUS
    );

    await postponeReservation({
      ...VALID_POSTPONEMENT_INPUT,
      cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
      reason: POSTPONE_PADDED_REASON,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      POSTPONE_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({
          p_payload: {
            ...POSTPONE_PAYLOAD,
            cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
            reason: POSTPONE_PADDED_REASON,
          },
        }),
      })
    );
  });

  it("sends zero readings as zero, not null", async () => {
    const fetchMock = respondWith(
      POSTPONE_RPC_RESULT,
      POSTPONE_SUCCESS_STATUS
    );

    await postponeReservation({
      ...VALID_POSTPONEMENT_INPUT,
      readings: [
        {
          itemId:
            VALID_POSTPONEMENT_INPUT.readings[0].itemId,
          fuelIn: 0,
          usageIn: 0,
        },
      ],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      POSTPONE_RPC_URL,
      expect.objectContaining({
        body: JSON.stringify({
          p_payload: {
            ...POSTPONE_PAYLOAD,
            readings: [POSTPONE_ZERO_READING_PAYLOAD],
          },
        }),
      })
    );
  });

  it("throws when the database returns no reservation", async () => {
    respondWith(null, POSTPONE_SUCCESS_STATUS);

    await expect(
      postponeReservation(VALID_POSTPONEMENT_INPUT)
    ).rejects.toThrow(
      RESERVATION_POSTPONEMENT_ERROR.OPERATION
        .MISSING_RESERVATION
    );
  });

  it("keeps the database message in the thrown error", async () => {
    respondWith(
      POSTPONE_RPC_ERROR_BODY,
      POSTPONE_BAD_REQUEST_STATUS
    );

    await expect(
      postponeReservation(VALID_POSTPONEMENT_INPUT)
    ).rejects.toThrow(POSTPONE_RPC_ERROR_BODY.message);
  });
});
