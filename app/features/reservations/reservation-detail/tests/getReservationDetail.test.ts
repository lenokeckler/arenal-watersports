import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_DETAIL_QUERY } from "../constants/ReservationDetailQuery.constants";
import { getAuthorizedReservationDetailClient } from "../services/getAuthorizedReservationDetailClient";
import { getReservationDetail } from "../services/getReservationDetail";
import {
  RESERVATION_DETAIL_TEST,
  RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
} from "./ReservationDetailTest.constants";
import { RESERVATION_DETAIL_SOURCE_FIXTURE } from "./ReservationDetailSourceFixture.constants";
import { createReservationDetailSupabaseClient } from "./createReservationDetailSupabaseClient";

vi.mock(
  "../services/getAuthorizedReservationDetailClient",
  () => ({
    getAuthorizedReservationDetailClient: vi.fn(),
  })
);

describe("getReservationDetail", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads and projects one reservation through the authenticated client", async () => {
    const supabase =
      createReservationDetailSupabaseClient();
    supabase.query.maybeSingle.mockResolvedValue({
      data: RESERVATION_DETAIL_SOURCE_FIXTURE,
      error: null,
    });
    supabase.rpc.mockResolvedValue({
      data: RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationDetailClient
    ).mockResolvedValue(supabase as never);

    const result = await getReservationDetail(
      RESERVATION_DETAIL_TEST.RESERVATION_ID
    );

    expect(result?.id).toBe(
      RESERVATION_DETAIL_TEST.RESERVATION_ID
    );
    expect(supabase.from).toHaveBeenCalledWith(
      "reservations"
    );
    expect(supabase.query.select).toHaveBeenCalledWith(
      RESERVATION_DETAIL_QUERY.SELECT
    );
    expect(supabase.query.eq).toHaveBeenCalledWith(
      "id",
      RESERVATION_DETAIL_TEST.RESERVATION_ID
    );
    expect(supabase.rpc).toHaveBeenCalledWith(
      RESERVATION_DETAIL_QUERY.WORKER_NAMES_RPC,
      {
        p_worker_ids: [
          RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
          RESERVATION_DETAIL_TEST.UPDATED_WORKER_ID,
          RESERVATION_DETAIL_TEST.GUIDE_WORKER_ID,
        ],
      }
    );
  });

  it("returns null when RLS hides a missing reservation", async () => {
    const supabase =
      createReservationDetailSupabaseClient();
    supabase.query.maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationDetailClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationDetail(
        RESERVATION_DETAIL_TEST.RESERVATION_ID
      )
    ).resolves.toBeNull();
  });
});
