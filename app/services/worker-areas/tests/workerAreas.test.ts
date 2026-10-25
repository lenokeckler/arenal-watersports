import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_RPC,
  SUPABASE_TABLE,
  SUPABASE_WORK_AREA,
  SUPABASE_WORKER_MARK,
  WORKER_AREA_CHANGE_RESULT,
  WORKER_AREA_INTENT,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { changeWorkerArea } from "../changeWorkerArea";
import { readWorkerAreasOverview } from "../readWorkerAreasOverview";

const WORKER_ROW = {
  base_role: SUPABASE_WORK_AREA.OPERATIONS,
  full_name: "Celso Rojas",
  id: "33333333-3333-3333-3333-333333333333",
  is_external_guide: false,
  username: "celso",
};

const maybeSingle = vi.fn();
const areasEq = vi.fn();
const rpc = vi.fn();
const marksEq = vi.fn();
const READS_BY_TABLE: Record<string, unknown> = {
  [SUPABASE_TABLE.WORKERS]: {
    select: () => ({ eq: () => ({ maybeSingle }) }),
  },
  [SUPABASE_TABLE.WORKER_AREAS]: {
    select: () => ({ eq: areasEq }),
  },
  [SUPABASE_TABLE.WORKER_MARKS]: {
    select: () => ({ eq: marksEq }),
  },
};
const from = vi.fn(
  (table: string) => READS_BY_TABLE[table]
);

const supabase = {
  from,
  rpc,
} as unknown as ServerSupabaseClient;

describe("readWorkerAreasOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the worker with every enabled area and mark", async () => {
    marksEq.mockResolvedValue({
      data: [{ mark: SUPABASE_WORKER_MARK.GUIDE }],
      error: null,
    });
    maybeSingle.mockResolvedValue({
      data: WORKER_ROW,
      error: null,
    });
    areasEq.mockResolvedValue({
      data: [
        { area: SUPABASE_WORK_AREA.OPERATIONS },
        { area: SUPABASE_WORK_AREA.RESERVATIONS },
      ],
      error: null,
    });

    expect(
      await readWorkerAreasOverview(
        supabase,
        WORKER_ROW.username
      )
    ).toEqual({
      areas: [
        SUPABASE_WORK_AREA.OPERATIONS,
        SUPABASE_WORK_AREA.RESERVATIONS,
      ],
      baseRole: WORKER_ROW.base_role,
      fullName: WORKER_ROW.full_name,
      id: WORKER_ROW.id,
      isExternalGuide: false,
      marks: [SUPABASE_WORKER_MARK.GUIDE],
      username: WORKER_ROW.username,
    });
  });

  it("returns nothing for an unknown username and reads no areas", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await readWorkerAreasOverview(
        supabase,
        WORKER_ROW.username
      )
    ).toBeNull();
    expect(areasEq).not.toHaveBeenCalled();
  });

  it("fails loudly when the worker read fails", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: { message: "down" },
    });

    await expect(
      readWorkerAreasOverview(supabase, WORKER_ROW.username)
    ).rejects.toThrow();
  });
});

describe("changeWorkerArea", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [
      WORKER_AREA_INTENT.GRANT,
      SUPABASE_RPC.GRANT_WORKER_AREA,
    ],
    [
      WORKER_AREA_INTENT.REVOKE,
      SUPABASE_RPC.REVOKE_WORKER_AREA,
    ],
  ])(
    "calls the database check for %s",
    async (intent, expectedRpc) => {
      rpc.mockResolvedValue({
        data: WORKER_AREA_CHANGE_RESULT.GRANTED,
        error: null,
      });

      await changeWorkerArea(supabase, {
        area: SUPABASE_WORK_AREA.RESERVATIONS,
        intent,
        workerId: WORKER_ROW.id,
      });

      expect(rpc).toHaveBeenCalledWith(expectedRpc, {
        target_area: SUPABASE_WORK_AREA.RESERVATIONS,
        target_worker: WORKER_ROW.id,
      });
    }
  );

  it.each(Object.values(WORKER_AREA_CHANGE_RESULT))(
    "reports the %s answer",
    async (answer) => {
      rpc.mockResolvedValue({ data: answer, error: null });

      expect(
        await changeWorkerArea(supabase, {
          area: SUPABASE_WORK_AREA.RESERVATIONS,
          intent: WORKER_AREA_INTENT.GRANT,
          workerId: WORKER_ROW.id,
        })
      ).toBe(answer);
    }
  );

  it("reports an unknown answer as a failure", async () => {
    rpc.mockResolvedValue({ data: "maybe", error: null });

    expect(
      await changeWorkerArea(supabase, {
        area: SUPABASE_WORK_AREA.RESERVATIONS,
        intent: WORKER_AREA_INTENT.GRANT,
        workerId: WORKER_ROW.id,
      })
    ).toBe(WORKER_AREA_CHANGE_RESULT.FAILED);
  });

  it("fails loudly when the call fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: { message: "down" },
    });

    await expect(
      changeWorkerArea(supabase, {
        area: SUPABASE_WORK_AREA.RESERVATIONS,
        intent: WORKER_AREA_INTENT.REVOKE,
        workerId: WORKER_ROW.id,
      })
    ).rejects.toThrow();
  });
});
