import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_BLOCKED_REASON,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { isBlockedByAttempts } from "../isBlockedByAttempts";
import {
  RPC_FAILURE,
  SIGNED_IN_USER_ID,
} from "./recordSignIn.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const maybeSingle = vi.fn();
const eq = vi.fn();
const select = vi.fn();
const from = vi.fn();

const reasonRow = (blockedReason: unknown) => ({
  data: { blocked_reason: blockedReason },
  error: null,
});

describe("isBlockedByAttempts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    maybeSingle.mockResolvedValue(reasonRow(null));
    eq.mockReturnValue({ maybeSingle });
    select.mockReturnValue({ eq });
    from.mockReturnValue({ select });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ from } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("reads only the blocked reason of the worker", async () => {
    await isBlockedByAttempts(SIGNED_IN_USER_ID);

    expect(from).toHaveBeenCalledOnce();
    expect(from).toHaveBeenCalledWith(
      SUPABASE_TABLE.WORKERS
    );
    expect(select).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.BLOCKED_REASON
    );
    expect(eq).toHaveBeenCalledOnce();
    expect(eq).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.ID,
      SIGNED_IN_USER_ID
    );
  });

  it.each([
    [
      "blocked by failed attempts",
      reasonRow(
        SUPABASE_WORKER_BLOCKED_REASON.FAILED_ATTEMPTS
      ),
      true,
    ],
    [
      "blocked by administration",
      reasonRow(
        SUPABASE_WORKER_BLOCKED_REASON.ADMINISTRATION
      ),
      false,
    ],
    ["not blocked", reasonRow(null), false],
    ["missing", { data: null, error: null }, false],
  ])(
    "reports a worker %s",
    async (_name, row, expected) => {
      maybeSingle.mockResolvedValue(row);

      await expect(
        isBlockedByAttempts(SIGNED_IN_USER_ID)
      ).resolves.toBe(expected);
    }
  );

  it("throws when the read fails instead of guessing", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      isBlockedByAttempts(SIGNED_IN_USER_ID)
    ).rejects.toThrow(SUPABASE_TABLE.WORKERS);
  });
});
