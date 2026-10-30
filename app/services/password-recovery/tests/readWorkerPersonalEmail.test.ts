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
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { readWorkerPersonalEmail } from "../readWorkerPersonalEmail";
import { RPC_FAILURE } from "./passwordRecovery.constants";
import {
  RESET_PERSONAL_EMAIL,
  RESET_WORKER_ID,
} from "./passwordRecoveryReset.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const maybeSingle = vi.fn();
const eq = vi.fn(() => ({ maybeSingle }));
const select = vi.fn(() => ({ eq }));
const from = vi.fn(() => ({ select }));

describe("readWorkerPersonalEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    maybeSingle.mockResolvedValue({
      data: { personal_email: RESET_PERSONAL_EMAIL },
      error: null,
    });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ from } as never);
  });

  it("reads the personal email of the worker by id", async () => {
    const email =
      await readWorkerPersonalEmail(RESET_WORKER_ID);

    expect(email).toBe(RESET_PERSONAL_EMAIL);
    expect(from).toHaveBeenCalledWith(
      SUPABASE_TABLE.WORKERS
    );
    expect(select).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.PERSONAL_EMAIL
    );
    expect(eq).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.ID,
      RESET_WORKER_ID
    );
  });

  it("returns null when the worker has no email or no row", async () => {
    maybeSingle.mockResolvedValueOnce({
      data: { personal_email: null },
      error: null,
    });
    maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    await expect(
      readWorkerPersonalEmail(RESET_WORKER_ID)
    ).resolves.toBeNull();
    await expect(
      readWorkerPersonalEmail(RESET_WORKER_ID)
    ).resolves.toBeNull();
  });

  it("throws when the read fails", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      readWorkerPersonalEmail(RESET_WORKER_ID)
    ).rejects.toThrow();
  });
});
