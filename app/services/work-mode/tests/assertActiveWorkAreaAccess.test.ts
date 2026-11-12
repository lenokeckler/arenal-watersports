import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PATHS,
  SUPABASE_RPC,
  SUPABASE_WORK_AREA,
  WORK_MODE_ROUTE_ACCESS,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { redirect } from "next/navigation";
import { assertActiveWorkAreaAccess } from "../assertActiveWorkAreaAccess";
import { ACTIVE_WORK_AREA_ACCESS_ERROR } from "./ActiveWorkAreaAccess.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new Error(path);
  }),
}));

const rpc = vi.fn();
const supabase = { rpc } as unknown as ServerSupabaseClient;

describe("assertActiveWorkAreaAccess", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects when the active mode does not match the route", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.RESERVATIONS,
        error: null,
      })
      .mockResolvedValueOnce({ data: false, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.OPERATIONS
      )
    ).rejects.toThrow(PATHS.MODE);
    expect(rpc).toHaveBeenCalledTimes(2);
  });

  it("does not bypass route restrictions for a non-administrator in an active mode", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.RESERVATIONS,
        error: null,
      })
      .mockResolvedValueOnce({ data: false, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.OPERATIONS
      )
    ).rejects.toThrow(PATHS.MODE);
    expect(rpc).toHaveBeenCalledTimes(2);
    expect(redirect).toHaveBeenCalledWith(PATHS.MODE);
  });

  it("checks server authorization for the active area before allowing the route", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.OPERATIONS,
        error: null,
      })
      .mockResolvedValueOnce({ data: true, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.BOARD
      )
    ).resolves.toBeUndefined();
    expect(rpc).toHaveBeenNthCalledWith(
      2,
      SUPABASE_RPC.HAS_AREA,
      { target: SUPABASE_WORK_AREA.OPERATIONS }
    );
    expect(redirect).not.toHaveBeenCalled();
  });

  it("allows reservations mode on the shared board route", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.RESERVATIONS,
        error: null,
      })
      .mockResolvedValueOnce({ data: true, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.BOARD
      )
    ).resolves.toBeUndefined();
  });

  it("rejects a stale or unauthorized active area", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.OPERATIONS,
        error: null,
      })
      .mockResolvedValueOnce({ data: false, error: null })
      .mockResolvedValueOnce({ data: false, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.OPERATIONS
      )
    ).rejects.toThrow(PATHS.MODE);
  });

  it("propagates authorization query errors before route data can be read", async () => {
    rpc.mockResolvedValueOnce({
      data: null,
      error: ACTIVE_WORK_AREA_ACCESS_ERROR,
    });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.BOARD
      )
    ).rejects.toThrow(SUPABASE_RPC.CURRENT_WORK_AREA);
  });
});
