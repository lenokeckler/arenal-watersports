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
import { readSignedInWorker } from "../readSignedInWorker";
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

describe("readSignedInWorker", () => {
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
      readSignedInWorker(supabase)
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
    await readSignedInWorker(supabase);

    expect(select).toHaveBeenCalledOnce();
    expect(selectedColumns).toBe(
      SUPABASE_WORKER_COLUMN.SIGNED_IN_WORKER
    );
  });

  it("returns the worker with the flag cleared once the change is done", async () => {
    maybeSingle.mockResolvedValue(workerRow(false));

    await expect(
      readSignedInWorker(supabase)
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
        readSignedInWorker(supabase)
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
      readSignedInWorker(supabase)
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
      readSignedInWorker(supabase)
    ).resolves.toBeNull();
  });

  it("throws when the read fails", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      readSignedInWorker(supabase)
    ).rejects.toThrow(RPC_FAILURE.message);
  });
});
