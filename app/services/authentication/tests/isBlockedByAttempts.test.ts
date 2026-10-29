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
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { isBlockedByAttempts } from "../isBlockedByAttempts";
import {
  RPC_FAILURE,
  SIGNED_IN_USER_ID,
} from "./recordSignIn.constants";

const maybeSingle = vi.fn();
const eq = vi.fn();
const select = vi.fn();
const from = vi.fn();
const supabase = {
  from,
} as unknown as ServerSupabaseClient;

let readTable: unknown;
let selectedColumns: unknown;
let filter: unknown[];

const reasonRow = (blockedReason: unknown) => ({
  data: { blocked_reason: blockedReason },
  error: null,
});

describe("isBlockedByAttempts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    maybeSingle.mockResolvedValue(reasonRow(null));
    eq.mockImplementation((...args: unknown[]) => {
      filter = args;
      return { maybeSingle };
    });
    select.mockImplementation((columns: unknown) => {
      selectedColumns = columns;
      return { eq };
    });
    from.mockImplementation((table: unknown) => {
      readTable = table;
      return { select };
    });
  });

  it("reads only the blocked reason of the worker with the given client", async () => {
    await isBlockedByAttempts(supabase, SIGNED_IN_USER_ID);

    expect(from).toHaveBeenCalledOnce();
    expect(readTable).toBe(SUPABASE_TABLE.WORKERS);
    expect(select).toHaveBeenCalledOnce();
    expect(selectedColumns).toBe(
      SUPABASE_WORKER_COLUMN.BLOCKED_REASON
    );
    expect(eq).toHaveBeenCalledOnce();
    expect(filter).toEqual([
      SUPABASE_WORKER_COLUMN.ID,
      SIGNED_IN_USER_ID,
    ]);
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
        isBlockedByAttempts(supabase, SIGNED_IN_USER_ID)
      ).resolves.toBe(expected);
    }
  );

  it("throws when the read fails instead of guessing", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      isBlockedByAttempts(supabase, SIGNED_IN_USER_ID)
    ).rejects.toThrow(SUPABASE_TABLE.WORKERS);
  });
});
