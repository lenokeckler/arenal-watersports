import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  SUPABASE_RPC,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { verifyPasswordResetPin } from "../verifyPasswordResetPin";
import {
  GRANT,
  PIN_INPUT,
} from "./passwordRecoveryGrant.constants";
import {
  INVALID_USERNAME,
  NORMALIZED_USERNAME,
  RPC_FAILURE,
} from "./passwordRecovery.constants";
import {
  RESET_NORMALIZED_PIN,
  RESET_SHORT_PIN,
} from "./passwordRecoveryReset.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("verifyPasswordResetPin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({ data: GRANT, error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as never);
  });

  it("exchanges the normalized username and PIN on the server", async () => {
    await verifyPasswordResetPin(PIN_INPUT);

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.EXCHANGE_PASSWORD_RESET_PIN,
      {
        p_pin: RESET_NORMALIZED_PIN,
        p_username: NORMALIZED_USERNAME,
      }
    );
  });

  it("hands over the pass for a correct PIN", async () => {
    await expect(
      verifyPasswordResetPin(PIN_INPUT)
    ).resolves.toEqual({ grant: GRANT, ok: true });
  });

  it("answers the single PIN error when no pass comes back", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await expect(
      verifyPasswordResetPin(PIN_INPUT)
    ).resolves.toMatchObject({
      error: {
        code: PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID,
      },
      ok: false,
    });
  });

  it.each([
    [
      "an empty username",
      { username: INVALID_USERNAME },
      PASSWORD_RECOVERY_ERROR_CODE.USERNAME_REQUIRED,
    ],
    [
      "a short PIN",
      { pin: RESET_SHORT_PIN },
      PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT,
    ],
  ])(
    "refuses %s before calling the server",
    async (_label, overrides, code) => {
      await expect(
        verifyPasswordResetPin({
          ...PIN_INPUT,
          ...overrides,
        })
      ).resolves.toMatchObject({
        error: { code },
        ok: false,
      });
      expect(rpc).not.toHaveBeenCalled();
    }
  );

  it("answers unknown when the server fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(
      verifyPasswordResetPin(PIN_INPUT)
    ).resolves.toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
  });
});
