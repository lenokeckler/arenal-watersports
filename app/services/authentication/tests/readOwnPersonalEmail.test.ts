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
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { SupabaseAuthOperationError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { readOwnPersonalEmail } from "../readOwnPersonalEmail";
import { SIGNED_IN_USER_RESULT } from "./firstSignIn.constants";
import { NETWORK_ERROR } from "./mapSignInAuthError.constants";
import {
  ADMINISTRATION_AREA,
  NON_ADMINISTRATION_WORK_AREA,
  OPTIONAL_OWN_PERSONAL_EMAIL,
  OWN_ADDRESS,
  personalEmailRow,
  REQUIRED_OWN_PERSONAL_EMAIL,
} from "./ownPersonalEmail.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);

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

describe("readOwnPersonalEmail", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    getUser.mockResolvedValue(SIGNED_IN_USER_RESULT);
    maybeSingle.mockResolvedValue(
      personalEmailRow(
        OWN_ADDRESS,
        NON_ADMINISTRATION_WORK_AREA
      )
    );
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

  it("returns the address of an optional account", async () => {
    await expect(
      readOwnPersonalEmail(supabase)
    ).resolves.toEqual(OPTIONAL_OWN_PERSONAL_EMAIL);
  });

  it("marks the administration account as requiring an address", async () => {
    maybeSingle.mockResolvedValue(
      personalEmailRow(OWN_ADDRESS, ADMINISTRATION_AREA)
    );

    await expect(
      readOwnPersonalEmail(supabase)
    ).resolves.toEqual(REQUIRED_OWN_PERSONAL_EMAIL);
  });

  it("returns a null address when none is registered", async () => {
    maybeSingle.mockResolvedValue(
      personalEmailRow(null, NON_ADMINISTRATION_WORK_AREA)
    );

    await expect(
      readOwnPersonalEmail(supabase)
    ).resolves.toEqual({
      address: null,
      isRequired: false,
    });
  });

  it("reads only the address and the role of the row of the signed-in user", async () => {
    await readOwnPersonalEmail(supabase);

    expect(from).toHaveBeenCalledOnce();
    expect(readTable).toBe(SUPABASE_TABLE.WORKERS);
    expect(select).toHaveBeenCalledOnce();
    expect(selectedColumns).toBe(
      SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL_STATE
    );
    expect(eq).toHaveBeenCalledOnce();
    expect(filter).toEqual([
      SUPABASE_WORKER_COLUMN.ID,
      SIGNED_IN_USER_RESULT.data.user.id,
    ]);
  });

  it("creates a server client when none is given", async () => {
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabase as never
    );

    await expect(readOwnPersonalEmail()).resolves.toEqual(
      OPTIONAL_OWN_PERSONAL_EMAIL
    );
    expect(
      createServerSupabaseClient
    ).toHaveBeenCalledOnce();
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
        readOwnPersonalEmail(supabase)
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
      readOwnPersonalEmail(supabase)
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
      readOwnPersonalEmail(supabase)
    ).resolves.toBeNull();
  });

  it("throws when the read fails", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      readOwnPersonalEmail(supabase)
    ).rejects.toMatchObject({ cause: RPC_FAILURE });
  });
});
