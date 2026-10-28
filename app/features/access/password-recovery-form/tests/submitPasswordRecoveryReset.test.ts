import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  storePasswordRecoveryGrant,
  verifyPasswordResetPin,
} from "@/app/services/password-recovery";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import {
  RESET_GRANT,
  RESET_INPUT,
} from "./passwordRecoveryReset.constants";
import {
  arrangeResetMocks,
  submitReset,
} from "./passwordRecoveryResetSetup";

vi.mock("@/app/services/password-recovery", () => ({
  storePasswordRecoveryGrant: vi.fn(),
  verifyPasswordResetPin: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("submitPasswordRecoveryReset", () => {
  beforeEach(() => {
    arrangeResetMocks();
    vi.mocked(verifyPasswordResetPin).mockResolvedValue({
      grant: RESET_GRANT,
      ok: true,
    });
  });

  it("verifies the posted username and PIN untouched", async () => {
    await expect(submitReset()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(verifyPasswordResetPin).toHaveBeenCalledOnce();
    expect(verifyPasswordResetPin).toHaveBeenCalledWith(
      RESET_INPUT
    );
  });

  it("stores the grant, then redirects to the new password step", async () => {
    await expect(submitReset()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(
      storePasswordRecoveryGrant
    ).toHaveBeenCalledOnce();
    expect(storePasswordRecoveryGrant).toHaveBeenCalledWith(
      RESET_GRANT
    );
    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.RECOVERY_PASSWORD
    );
    expect(
      vi.mocked(storePasswordRecoveryGrant).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      vi.mocked(redirect).mock.invocationCallOrder[0]
    );
  });
});
