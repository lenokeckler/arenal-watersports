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
import type { Database } from "@/app/types";
import { WORKER_STATUS } from "@/app/constants";
import { RESERVATION_GUIDE_QUERY } from "../constants/ReservationGuideQuery.constants";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationGuides } from "../services/getReservationGuides";
import {
  GUIDE_QUERY_FIXTURE,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS,
} from "./getReservationGuides.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("getReservationGuides", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(
      createClient<Database>(
        SUPABASE.URL,
        SUPABASE.ANON_KEY
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps guide-marked workers from the authorized query", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify([GUIDE_QUERY_FIXTURE]), {
        status: SUCCESS_STATUS,
      })
    );

    await expect(getReservationGuides()).resolves.toEqual([
      {
        id: GUIDE_QUERY_FIXTURE.id,
        name: GUIDE_QUERY_FIXTURE.full_name,
      },
    ]);
    const [requestUrl] = fetchMock.mock.calls[0];
    const query = new URL(String(requestUrl)).searchParams;
    expect(
      query.get(RESERVATION_GUIDE_QUERY.GUIDE_MARK_COLUMN)
    ).toBe(`eq.${RESERVATION_GUIDE_QUERY.GUIDE_MARK}`);
    expect(
      query.get(
        RESERVATION_GUIDE_QUERY.ACTIVE_STATUS_COLUMN
      )
    ).toBe(`eq.${WORKER_STATUS.ACTIVE}`);
    const expirationFilter = query.get(
      RESERVATION_GUIDE_QUERY.EXPIRATION_FILTER_COLUMN
    );
    expect(expirationFilter).toContain(
      `${RESERVATION_GUIDE_QUERY.EXPIRATION_COLUMN}.is.null`
    );
    expect(expirationFilter).toContain(
      `${RESERVATION_GUIDE_QUERY.EXPIRATION_COLUMN}.gt.`
    );
  });

  it("preserves operation context when the guide query fails", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          code: "XX000",
          details: null,
          hint: null,
          message: "Guide query failed",
        }),
        { status: SERVER_ERROR_STATUS }
      )
    );

    await expect(getReservationGuides()).rejects.toThrow(
      "Supabase query failed: load reservation guides"
    );
  });
});
