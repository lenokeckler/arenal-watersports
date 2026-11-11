import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { markPasswordResetPinUndelivered } from "../markPasswordResetPinUndelivered";
import {
  ISSUED_PIN,
  RPC_FAILURE,
} from "./passwordRecovery.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("markPasswordResetPinUndelivered", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({ error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("marks the pin by id", async () => {
    await markPasswordResetPinUndelivered(ISSUED_PIN.pinId);

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.MARK_PASSWORD_RESET_PIN_UNDELIVERED,
      { p_pin_id: ISSUED_PIN.pinId }
    );
  });

  it("throws when the database rejects the call", async () => {
    rpc.mockResolvedValue({ error: RPC_FAILURE });

    await expect(
      markPasswordResetPinUndelivered(ISSUED_PIN.pinId)
    ).rejects.toThrow(RPC_FAILURE.message);
  });
});
