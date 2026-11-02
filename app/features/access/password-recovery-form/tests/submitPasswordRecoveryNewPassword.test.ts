import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  forgetPasswordRecoveryGrant,
  readPasswordRecoveryGrant,
  resetPasswordWithGrant,
} from "@/app/services/password-recovery";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPasswordRecoveryNewPassword } from "../actions/submitPasswordRecoveryNewPassword";
import {
  NEW_PASSWORD_FORM_ENTRIES,
  NEW_PASSWORD_GRANT,
  NEW_PASSWORD_INPUT,
  PASSWORD_NOT_SAVED_ERROR,
  RESET_EXPIRED_ERROR,
} from "./passwordRecoveryNewPassword.constants";
import { LOGIN_RECOVERED_PATH } from "./passwordRecoveryReset.constants";

vi.mock("@/app/services/password-recovery", () => ({
  forgetPasswordRecoveryGrant: vi.fn(),
  readPasswordRecoveryGrant: vi.fn(),
  resetPasswordWithGrant: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("next/server", () => ({
  after: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const signOut = vi.fn();

const submit = () =>
  submitPasswordRecoveryNewPassword(
    null,
    (() => {
      const formData = new FormData();
      NEW_PASSWORD_FORM_ENTRIES.forEach(([name, value]) =>
        formData.append(name, value)
      );
      return formData;
    })()
  );

describe("submitPasswordRecoveryNewPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    signOut.mockResolvedValue({ error: null });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        auth: { signOut },
      } as never
    );
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
    vi.mocked(readPasswordRecoveryGrant).mockResolvedValue(
      NEW_PASSWORD_GRANT
    );
    vi.mocked(resetPasswordWithGrant).mockResolvedValue({
      ok: true,
    });
  });

  it("saves the password with the pass from the cookie", async () => {
    await expect(submit()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(resetPasswordWithGrant).toHaveBeenCalledWith(
      { ...NEW_PASSWORD_INPUT, grant: NEW_PASSWORD_GRANT },
      expect.any(Function)
    );
  });

  it("forgets the pass, signs this browser out and goes to the login with the notice", async () => {
    await expect(submit()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(
      forgetPasswordRecoveryGrant
    ).toHaveBeenCalledOnce();
    expect(signOut).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(
      LOGIN_RECOVERED_PATH
    );
  });

  it("says the time ran out when there is no pass, without calling the service", async () => {
    vi.mocked(readPasswordRecoveryGrant).mockResolvedValue(
      null
    );

    await expect(submit()).resolves.toEqual(
      RESET_EXPIRED_ERROR
    );
    expect(resetPasswordWithGrant).not.toHaveBeenCalled();
  });

  it("forgets a pass the server says is no longer open", async () => {
    vi.mocked(resetPasswordWithGrant).mockResolvedValue({
      error: RESET_EXPIRED_ERROR,
      ok: false,
    });

    await expect(submit()).resolves.toEqual(
      RESET_EXPIRED_ERROR
    );
    expect(
      forgetPasswordRecoveryGrant
    ).toHaveBeenCalledOnce();
  });

  it("keeps the pass for any other failure so the worker can try again", async () => {
    vi.mocked(resetPasswordWithGrant).mockResolvedValue({
      error: PASSWORD_NOT_SAVED_ERROR,
      ok: false,
    });

    await expect(submit()).resolves.toEqual(
      PASSWORD_NOT_SAVED_ERROR
    );
    expect(
      forgetPasswordRecoveryGrant
    ).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
