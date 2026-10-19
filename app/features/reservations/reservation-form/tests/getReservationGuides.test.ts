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
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationGuides } from "../services/getReservationGuides";
import {
  GUIDE_QUERY_FIXTURE,
  GUIDE_WORKER_RELATION,
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
    expect(String(requestUrl)).toContain(
      "worker_marks.mark=eq.guia"
    );
    expect(String(requestUrl)).toContain(
      GUIDE_WORKER_RELATION
    );
    expect(String(requestUrl)).not.toContain("status=eq");
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
