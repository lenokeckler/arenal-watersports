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
  isPasswordResetGrantOpen,
  readPasswordRecoveryGrant,
} from "@/app/services/password-recovery";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { requireOpenPasswordRecoveryGrant } from "../utils/requireOpenPasswordRecoveryGrant";
import { NEW_PASSWORD_GRANT } from "./passwordRecoveryNewPassword.constants";

vi.mock("@/app/services/password-recovery", () => ({
  isPasswordResetGrantOpen: vi.fn(),
  readPasswordRecoveryGrant: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("requireOpenPasswordRecoveryGrant", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
    vi.mocked(readPasswordRecoveryGrant).mockResolvedValue(
      NEW_PASSWORD_GRANT
    );
    vi.mocked(isPasswordResetGrantOpen).mockResolvedValue(
      true
    );
  });

  it("lets the screen open with a live pass", async () => {
    await expect(
      requireOpenPasswordRecoveryGrant()
    ).resolves.toBeUndefined();
    expect(isPasswordResetGrantOpen).toHaveBeenCalledWith(
      NEW_PASSWORD_GRANT
    );
  });

  it("sends the worker to ask for a PIN without a pass", async () => {
    vi.mocked(readPasswordRecoveryGrant).mockResolvedValue(
      null
    );

    await expect(
      requireOpenPasswordRecoveryGrant()
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.RECOVERY
    );
  });

  it("sends the worker to ask for a PIN when the pass is closed", async () => {
    vi.mocked(isPasswordResetGrantOpen).mockResolvedValue(
      false
    );

    await expect(
      requireOpenPasswordRecoveryGrant()
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.RECOVERY
    );
  });
});
