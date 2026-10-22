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
import { getPredefinedReservationCombos } from "../services/getPredefinedReservationCombos";
import {
  PREDEFINED_COMBO_RESERVABILITY,
  PREDEFINED_COMBO_STATUS,
} from "../constants/PredefinedCombo.constants";
import {
  DEFAULT_PREDEFINED_COMBO_RECORDS,
  PREDEFINED_COMBO_HTTP_STATUS,
  PREDEFINED_COMBO_TEST_IDS,
} from "./predefinedCombo.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("getPredefinedReservationCombos", () => {
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

  it("loads active persisted combos and their category components", async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify(
            DEFAULT_PREDEFINED_COMBO_RECORDS.combos
          ),
          {
            status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify(
            DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems
          ),
          {
            status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify(
            DEFAULT_PREDEFINED_COMBO_RECORDS.categories
          ),
          {
            status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
          }
        )
      );

    const combos = await getPredefinedReservationCombos();

    expect(combos).toHaveLength(2);
    expect(String(fetchMock.mock.calls[0][0])).toContain(
      `status=eq.${PREDEFINED_COMBO_STATUS.ACTIVE}`
    );
    expect(String(fetchMock.mock.calls[1][0])).toContain(
      PREDEFINED_COMBO_TEST_IDS.COMBO
    );
    expect(String(fetchMock.mock.calls[2][0])).toContain(
      PREDEFINED_COMBO_TEST_IDS.CATEGORY
    );
    expect(String(fetchMock.mock.calls[2][0])).toContain(
      `is_reservable=eq.${PREDEFINED_COMBO_RESERVABILITY.RESERVABLE}`
    );
  });

  it("returns empty when there are no active combos", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
      })
    );

    await expect(
      getPredefinedReservationCombos()
    ).resolves.toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns empty when active combos have no component rows", async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify(
            DEFAULT_PREDEFINED_COMBO_RECORDS.combos
          ),
          {
            status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([]), {
          status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
        })
      );

    await expect(
      getPredefinedReservationCombos()
    ).resolves.toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("preserves the operation context when component loading fails", async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify(
            DEFAULT_PREDEFINED_COMBO_RECORDS.combos
          ),
          {
            status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            code: "XX000",
            details: null,
            hint: null,
            message: "Combo items query failed",
          }),
          {
            status:
              PREDEFINED_COMBO_HTTP_STATUS.SERVER_ERROR,
          }
        )
      );

    await expect(
      getPredefinedReservationCombos()
    ).rejects.toThrow(
      "Supabase query failed: load predefined reservation combos"
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("preserves the operation context when category loading fails", async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify(
            DEFAULT_PREDEFINED_COMBO_RECORDS.combos
          ),
          {
            status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify(
            DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems
          ),
          {
            status: PREDEFINED_COMBO_HTTP_STATUS.SUCCESS,
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            code: "XX000",
            details: null,
            hint: null,
            message: "Categories query failed",
          }),
          {
            status:
              PREDEFINED_COMBO_HTTP_STATUS.SERVER_ERROR,
          }
        )
      );

    await expect(
      getPredefinedReservationCombos()
    ).rejects.toThrow(
      "Supabase query failed: load predefined reservation combos"
    );
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("preserves the operation context when the combo query fails", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          code: "XX000",
          details: null,
          hint: null,
          message: "Combo query failed",
        }),
        {
          status: PREDEFINED_COMBO_HTTP_STATUS.SERVER_ERROR,
        }
      )
    );

    await expect(
      getPredefinedReservationCombos()
    ).rejects.toThrow(
      "Supabase query failed: load predefined reservation combos"
    );
  });
});
