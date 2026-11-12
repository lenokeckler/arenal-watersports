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

vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new Error(path);
  }),
}));

const rpc = vi.fn();
const supabase = { rpc } as unknown as ServerSupabaseClient;

describe("assertActiveWorkAreaAccess for administrators", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    ["board", WORK_MODE_ROUTE_ACCESS.BOARD],
    ["operations", WORK_MODE_ROUTE_ACCESS.OPERATIONS],
  ])(
    "allows an administrator whose active mode is administration on the %s route",
    async (_routeName, allowedAreas) => {
      rpc
        .mockResolvedValueOnce({
          data: SUPABASE_WORK_AREA.ADMINISTRATION,
          error: null,
        })
        .mockResolvedValueOnce({ data: true, error: null });

      await expect(
        assertActiveWorkAreaAccess(supabase, allowedAreas)
      ).resolves.toBeUndefined();
      expect(rpc).toHaveBeenNthCalledWith(
        2,
        SUPABASE_RPC.IS_ADMIN
      );
      expect(redirect).not.toHaveBeenCalled();
    }
  );

  it("allows an administrator in reservations mode on the operations route", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.RESERVATIONS,
        error: null,
      })
      .mockResolvedValueOnce({ data: true, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.OPERATIONS
      )
    ).resolves.toBeUndefined();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("allows an administrator whose active area is no longer granted", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.OPERATIONS,
        error: null,
      })
      .mockResolvedValueOnce({ data: false, error: null })
      .mockResolvedValueOnce({ data: true, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.OPERATIONS
      )
    ).resolves.toBeUndefined();
  });

  it("still redirects a non-administrator in administration mode", async () => {
    rpc
      .mockResolvedValueOnce({
        data: SUPABASE_WORK_AREA.ADMINISTRATION,
        error: null,
      })
      .mockResolvedValueOnce({ data: false, error: null });

    await expect(
      assertActiveWorkAreaAccess(
        supabase,
        WORK_MODE_ROUTE_ACCESS.BOARD
      )
    ).rejects.toThrow(PATHS.MODE);
    expect(redirect).toHaveBeenCalledWith(PATHS.MODE);
  });
});
