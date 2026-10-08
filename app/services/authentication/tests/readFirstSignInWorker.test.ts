import { AuthSessionMissingError } from "@supabase/supabase-js";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SupabaseAuthOperationError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { readFirstSignInWorker } from "../readFirstSignInWorker";
import {
  FIRST_SIGN_IN_WORKER,
  SIGNED_IN_USER_RESULT,
  workerRow,
} from "./firstSignIn.constants";
import { NETWORK_ERROR } from "./mapSignInAuthError.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

const getUser = vi.fn();
const maybeSingle = vi.fn();
const eq = vi.fn();
const select = vi.fn();
const from = vi.fn();
const supabase = {
  auth: { getUser },
  from,
} as unknown as ServerSupabaseClient;

let readTable: unknown;
let selectedColumns: unknown;
let filter: unknown[];

describe("readFirstSignInWorker", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    getUser.mockResolvedValue(SIGNED_IN_USER_RESULT);
    maybeSingle.mockResolvedValue(workerRow(true));
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

  it("returns the worker whose change is pending", async () => {
    await expect(
      readFirstSignInWorker(supabase)
    ).resolves.toEqual(FIRST_SIGN_IN_WORKER);
    expect(from).toHaveBeenCalledOnce();
    expect(readTable).toBe(SUPABASE_TABLE.WORKERS);
    expect(eq).toHaveBeenCalledOnce();
    expect(filter).toEqual([
      SUPABASE_WORKER_COLUMN.ID,
      FIRST_SIGN_IN_WORKER.id,
    ]);
  });

  it("reads the username and the pending flag only", async () => {
    await readFirstSignInWorker(supabase);

    expect(select).toHaveBeenCalledOnce();
    expect(selectedColumns).toBe(
      SUPABASE_WORKER_COLUMN.FIRST_SIGN_IN
    );
  });

  it("returns the worker with the flag cleared once the change is done", async () => {
    maybeSingle.mockResolvedValue(workerRow(false));

    await expect(
      readFirstSignInWorker(supabase)
    ).resolves.toEqual({
      ...FIRST_SIGN_IN_WORKER,
      mustChangePassword: false,
    });
  });

  it.each([
    ["no signed-in user", null],
    ["a missing session", new AuthSessionMissingError()],
  ])(
    "returns null for %s and reads nothing",
    async (_name, error) => {
      getUser.mockResolvedValue({
        data: { user: null },
        error,
      });

      await expect(
        readFirstSignInWorker(supabase)
      ).resolves.toBeNull();
      expect(from).not.toHaveBeenCalled();
    }
  );

  it("rethrows a user lookup failure with its cause and reads nothing", async () => {
    getUser.mockResolvedValue({
      data: { user: null },
      error: NETWORK_ERROR,
    });

    await expect(
      readFirstSignInWorker(supabase)
    ).rejects.toMatchObject({
      cause: NETWORK_ERROR,
      name: SupabaseAuthOperationError.name,
    });
    expect(from).not.toHaveBeenCalled();
  });

  it("returns null when the worker has no row", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      readFirstSignInWorker(supabase)
    ).resolves.toBeNull();
  });

  it("throws when the read fails", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      readFirstSignInWorker(supabase)
    ).rejects.toThrow(RPC_FAILURE.message);
  });
});
