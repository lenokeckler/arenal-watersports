import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_TABLE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { readFirstSignInWorker } from "../readFirstSignInWorker";
import { FIRST_SIGN_IN_WORKER } from "./firstSignIn.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

const getUser = vi.fn();
const maybeSingle = vi.fn();
const eq = vi.fn(() => ({ maybeSingle }));
const select = vi.fn(() => ({ eq }));
const from = vi.fn(() => ({ select }));
const supabase = {
  auth: { getUser },
  from,
} as unknown as ServerSupabaseClient;

const workerRow = (mustChangePassword: boolean) => ({
  data: {
    must_change_password: mustChangePassword,
    username: FIRST_SIGN_IN_WORKER.username,
  },
  error: null,
});

describe("readFirstSignInWorker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUser.mockResolvedValue({
      data: { user: { id: FIRST_SIGN_IN_WORKER.id } },
    });
    maybeSingle.mockResolvedValue(workerRow(true));
  });

  it("returns the worker whose change is pending", async () => {
    await expect(
      readFirstSignInWorker(supabase)
    ).resolves.toEqual(FIRST_SIGN_IN_WORKER);
    expect(from).toHaveBeenCalledWith(
      SUPABASE_TABLE.WORKERS
    );
    expect(eq).toHaveBeenCalledWith(
      "id",
      FIRST_SIGN_IN_WORKER.id
    );
  });

  it("reads the username and the pending flag of the signed-in worker only", async () => {
    let selectedColumns: unknown;
    select.mockImplementation(((columns: unknown) => {
      selectedColumns = columns;
      return { eq };
    }) as unknown as typeof select);

    await readFirstSignInWorker(supabase);

    expect(selectedColumns).toBe(
      "username, must_change_password"
    );
  });

  it("returns null without a signed-in user and reads nothing", async () => {
    getUser.mockResolvedValue({ data: { user: null } });

    await expect(
      readFirstSignInWorker(supabase)
    ).resolves.toBeNull();
    expect(from).not.toHaveBeenCalled();
  });

  it("returns null when the change is not pending", async () => {
    maybeSingle.mockResolvedValue(workerRow(false));

    await expect(
      readFirstSignInWorker(supabase)
    ).resolves.toBeNull();
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
