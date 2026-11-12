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

describe("assertActiveWorkAreaAccess without an active mode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects non-administrators to mode selection", async () => {
    rpc
      .mockResolvedValueOnce({ data: null, error: null })
      .mockResolvedValueOnce({ data: false, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.BOARD
      )
    ).rejects.toThrow(PATHS.MODE);
    expect(rpc).toHaveBeenNthCalledWith(
      2,
      SUPABASE_RPC.IS_ADMIN
    );
  });

  it("allows administrators without an active work area", async () => {
    rpc
      .mockResolvedValueOnce({ data: null, error: null })
      .mockResolvedValueOnce({ data: true, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.BOARD
      )
    ).resolves.toBeUndefined();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("propagates administrator check errors", async () => {
    rpc
      .mockResolvedValueOnce({ data: null, error: null })
      .mockResolvedValueOnce({
        data: null,
        error: ACTIVE_WORK_AREA_ACCESS_ERROR,
      });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.BOARD
      )
    ).rejects.toThrow(SUPABASE_RPC.IS_ADMIN);
  });
});
