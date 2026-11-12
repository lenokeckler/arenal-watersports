import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_RPC,
  SUPABASE_WORK_AREA,
  WORK_MODE_RESULT,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { hasSeveralWorkAreas } from "@/app/utils/work-mode/hasSeveralWorkAreas";
import { needsWorkModeChoice } from "@/app/utils/work-mode/needsWorkModeChoice";
import { chooseWorkArea } from "../chooseWorkArea";
import { readWorkModeOverview } from "../readWorkModeOverview";

const USER_ID = "33333333-3333-3333-3333-333333333333";
const getUser = vi.fn();
const areasEq = vi.fn();
const rpc = vi.fn();
const supabase = {
  auth: { getUser },
  from: () => ({ select: () => ({ eq: areasEq }) }),
  rpc,
} as unknown as ServerSupabaseClient;

const BOTH_AREAS = [
  SUPABASE_WORK_AREA.OPERATIONS,
  SUPABASE_WORK_AREA.RESERVATIONS,
];

describe("readWorkModeOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUser.mockResolvedValue({
      data: { user: { id: USER_ID } },
      error: null,
    });
  });

  it("returns the own areas and the current mode from the database", async () => {
    areasEq.mockResolvedValue({
      data: BOTH_AREAS.map((area) => ({ area })),
      error: null,
    });
    rpc.mockResolvedValue({
      data: SUPABASE_WORK_AREA.RESERVATIONS,
      error: null,
    });

    expect(await readWorkModeOverview(supabase)).toEqual({
      areas: BOTH_AREAS,
      current: SUPABASE_WORK_AREA.RESERVATIONS,
    });
    expect(areasEq).toHaveBeenCalledWith(
      expect.any(String),
      USER_ID
    );
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CURRENT_WORK_AREA
    );
  });

  it("returns nothing without a signed-in account", async () => {
    getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    expect(await readWorkModeOverview(supabase)).toBeNull();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("fails loudly when the mode read fails", async () => {
    areasEq.mockResolvedValue({ data: [], error: null });
    rpc.mockResolvedValue({
      data: null,
      error: { message: "down" },
    });

    await expect(
      readWorkModeOverview(supabase)
    ).rejects.toThrow();
  });
});

describe("chooseWorkArea", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("asks the database to set the mode", async () => {
    rpc.mockResolvedValue({
      data: WORK_MODE_RESULT.CHOSEN,
      error: null,
    });

    expect(
      await chooseWorkArea(
        supabase,
        SUPABASE_WORK_AREA.OPERATIONS
      )
    ).toBe(WORK_MODE_RESULT.CHOSEN);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CHOOSE_WORK_AREA,
      {
        target: SUPABASE_WORK_AREA.OPERATIONS,
      }
    );
  });

  it.each([
    WORK_MODE_RESULT.NOT_ENABLED,
    WORK_MODE_RESULT.NOT_ALLOWED,
  ])("reports the refusal %s", async (answer) => {
    rpc.mockResolvedValue({ data: answer, error: null });

    expect(
      await chooseWorkArea(
        supabase,
        SUPABASE_WORK_AREA.OPERATIONS
      )
    ).toBe(answer);
  });

  it("reports an unknown answer as a failure", async () => {
    rpc.mockResolvedValue({ data: "maybe", error: null });

    expect(
      await chooseWorkArea(
        supabase,
        SUPABASE_WORK_AREA.OPERATIONS
      )
    ).toBe(WORK_MODE_RESULT.FAILED);
  });
});

describe("work mode rules", () => {
  it.each([
    [[SUPABASE_WORK_AREA.OPERATIONS], null, false],
    [BOTH_AREAS, null, true],
    [BOTH_AREAS, SUPABASE_WORK_AREA.OPERATIONS, false],
  ] as const)(
    "with areas %j and mode %s must choose: %s",
    (areas, current, expected) => {
      expect(needsWorkModeChoice({ areas, current })).toBe(
        expected
      );
    }
  );

  it.each([
    [[SUPABASE_WORK_AREA.OPERATIONS], false],
    [BOTH_AREAS, true],
  ] as const)(
    "with areas %j has several: %s",
    (areas, expected) => {
      expect(
        hasSeveralWorkAreas({ areas, current: null })
      ).toBe(expected);
    }
  );
});
