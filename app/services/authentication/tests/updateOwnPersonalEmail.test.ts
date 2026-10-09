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
import { SupabaseNoRowsAffectedError } from "@/app/utils/supabase-error/SupabaseNoRowsAffectedError";
import {
  OWN_ADDRESS,
  WORKER_ID,
} from "./ownPersonalEmail.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";
import { updateOwnPersonalEmail } from "../updateOwnPersonalEmail";

const select = vi.fn();
const eq = vi.fn();
const update = vi.fn();
const from = vi.fn();
const supabase = {
  from,
} as unknown as ServerSupabaseClient;

let writtenTable: unknown;
let writtenValues: unknown;
let filter: unknown[];
let returnedColumns: unknown;

describe("updateOwnPersonalEmail", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    select.mockImplementation((columns: unknown) => {
      returnedColumns = columns;
      return Promise.resolve({
        data: [{ id: WORKER_ID }],
        error: null,
      });
    });
    eq.mockImplementation((...args: unknown[]) => {
      filter = args;
      return { select };
    });
    update.mockImplementation((values: unknown) => {
      writtenValues = values;
      return { eq };
    });
    from.mockImplementation((table: unknown) => {
      writtenTable = table;
      return { update };
    });
  });

  it("writes only the personal email of the given worker", async () => {
    await expect(
      updateOwnPersonalEmail(
        supabase,
        WORKER_ID,
        OWN_ADDRESS
      )
    ).resolves.toBeUndefined();

    expect(from).toHaveBeenCalledOnce();
    expect(writtenTable).toBe(SUPABASE_TABLE.WORKERS);
    expect(update).toHaveBeenCalledOnce();
    expect(writtenValues).toEqual({
      [SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL]: OWN_ADDRESS,
    });
    expect(eq).toHaveBeenCalledOnce();
    expect(filter).toEqual([
      SUPABASE_WORKER_COLUMN.ID,
      WORKER_ID,
    ]);
    expect(returnedColumns).toBe(SUPABASE_WORKER_COLUMN.ID);
  });

  it("writes null to remove the address", async () => {
    await updateOwnPersonalEmail(supabase, WORKER_ID, null);

    expect(writtenValues).toEqual({
      [SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL]: null,
    });
  });

  it("throws when no row was changed", async () => {
    select.mockResolvedValue({ data: [], error: null });

    await expect(
      updateOwnPersonalEmail(
        supabase,
        WORKER_ID,
        OWN_ADDRESS
      )
    ).rejects.toBeInstanceOf(SupabaseNoRowsAffectedError);
  });

  it("throws when the write fails", async () => {
    select.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      updateOwnPersonalEmail(
        supabase,
        WORKER_ID,
        OWN_ADDRESS
      )
    ).rejects.toMatchObject({ cause: RPC_FAILURE });
  });
});
