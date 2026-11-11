import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  storePasswordRecoveryGrant,
  verifyPasswordResetPin,
} from "@/app/services/password-recovery";
import { submitPasswordRecoveryReset } from "../actions/submitPasswordRecoveryReset";
import { createPasswordRecoveryResetFormData } from "./createPasswordRecoveryResetFormData";
import {
  RESET_INPUT,
  RETURNED_ERRORS,
  UNKNOWN_ERROR,
} from "./passwordRecoveryReset.constants";
import { SERVICE_FAILURE_MESSAGE } from "./passwordRecoveryRequest.constants";
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

describe("submitPasswordRecoveryReset failures", () => {
  beforeEach(arrangeResetMocks);

  it.each(RETURNED_ERRORS)(
    "returns the %o error without storing a grant or redirecting",
    async (error) => {
      vi.mocked(verifyPasswordResetPin).mockResolvedValue({
        error,
        ok: false,
      });

      await expect(submitReset()).resolves.toBe(error);

      expect(
        storePasswordRecoveryGrant
      ).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    }
  );

  it("answers unknown when the service throws", async () => {
    vi.mocked(verifyPasswordResetPin).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(submitReset()).resolves.toEqual(
      UNKNOWN_ERROR
    );

    expect(
      storePasswordRecoveryGrant
    ).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("ignores the previous error", async () => {
    vi.mocked(verifyPasswordResetPin).mockResolvedValue({
      ok: false,
      error: UNKNOWN_ERROR,
    });

    await expect(
      submitPasswordRecoveryReset(
        RETURNED_ERRORS[0],
        createPasswordRecoveryResetFormData(RESET_INPUT)
      )
    ).resolves.toBe(UNKNOWN_ERROR);
  });
});
