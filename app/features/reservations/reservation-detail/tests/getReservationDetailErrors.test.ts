import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_DETAIL_OPERATION } from "../constants/ReservationDetail.constants";
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

describe("getReservationDetail query errors", () => {
  beforeEach(() => vi.clearAllMocks());

  it("throws reservation query errors before projecting data", async () => {
    const supabase =
      createReservationDetailSupabaseClient();
    supabase.query.maybeSingle.mockResolvedValue({
      data: RESERVATION_DETAIL_SOURCE_FIXTURE,
      error: {
        code: RESERVATION_DETAIL_TEST.ERROR_CODE,
        details: "",
        hint: "",
        message: RESERVATION_DETAIL_TEST.ERROR_MESSAGE,
      },
    });
    vi.mocked(
      getAuthorizedReservationDetailClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationDetail(
        RESERVATION_DETAIL_TEST.RESERVATION_ID
      )
    ).rejects.toThrow(
      `Supabase query failed: ${RESERVATION_DETAIL_OPERATION.LOAD}`
    );
  });

  it("throws worker-name RPC errors before projecting detail", async () => {
    const supabase =
      createReservationDetailSupabaseClient();
    supabase.query.maybeSingle.mockResolvedValue({
      data: RESERVATION_DETAIL_SOURCE_FIXTURE,
      error: null,
    });
    supabase.rpc.mockResolvedValue({
      data: RESERVATION_DETAIL_WORKER_NAMES_FIXTURE,
      error: {
        code: RESERVATION_DETAIL_TEST.ERROR_CODE,
        details: "",
        hint: "",
        message:
          RESERVATION_DETAIL_TEST.WORKER_NAMES_ERROR_MESSAGE,
      },
    });
    vi.mocked(
      getAuthorizedReservationDetailClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationDetail(
        RESERVATION_DETAIL_TEST.RESERVATION_ID
      )
    ).rejects.toThrow(
      `Supabase query failed: ${RESERVATION_DETAIL_OPERATION.LOAD}`
    );
  });
});
