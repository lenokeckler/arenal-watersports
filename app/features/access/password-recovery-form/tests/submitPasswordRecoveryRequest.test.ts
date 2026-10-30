import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { PATHS } from "@/app/constants";
import {
  requestPasswordRecovery,
  storePasswordRecoveryUsername,
} from "@/app/services/password-recovery";
import { readClientNetworkKey } from "@/app/services/request";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPasswordRecoveryRequest } from "../actions/submitPasswordRecoveryRequest";
import { createPasswordRecoveryRequestFormData } from "./createPasswordRecoveryRequestFormData";
import {
  INJECTED_USERNAME,
  NETWORK_KEY,
  RAW_USERNAME,
  RETURNED_ERRORS,
} from "./passwordRecoveryRequest.constants";

vi.mock("@/app/services/password-recovery", () => ({
  requestPasswordRecovery: vi.fn(),
  storePasswordRecoveryUsername: vi.fn(),
}));

vi.mock("@/app/services/request", () => ({
  readClientNetworkKey: vi.fn(),
}));

vi.mock("next/server", () => ({
  after: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const submitUsername = (username: string) =>
  submitPasswordRecoveryRequest(
    null,
    createPasswordRecoveryRequestFormData(username)
  );

describe("submitPasswordRecoveryRequest", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(readClientNetworkKey).mockResolvedValue(
      NETWORK_KEY
    );
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it("requests the PIN with the posted username and the network key", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitUsername(RAW_USERNAME)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(requestPasswordRecovery).toHaveBeenCalledOnce();
    expect(requestPasswordRecovery).toHaveBeenCalledWith(
      { networkKey: NETWORK_KEY, username: RAW_USERNAME },
      expect.any(Function)
    );
  });

  it("redirects to the reset screen without the username in the address", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitUsername(RAW_USERNAME)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.RECOVERY_RESET
    );
  });

  it("keeps the username for the PIN screen in the recovery cookie", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitUsername(RAW_USERNAME)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(
      storePasswordRecoveryUsername
    ).toHaveBeenCalledWith(RAW_USERNAME);
  });

  it("keeps query-like characters of a username out of the address", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitUsername(INJECTED_USERNAME)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.RECOVERY_RESET
    );
  });

  it.each(RETURNED_ERRORS)(
    "returns the %o error without redirecting",
    async (error) => {
      vi.mocked(requestPasswordRecovery).mockResolvedValue({
        error,
        ok: false,
      });

      await expect(
        submitUsername(RAW_USERNAME)
      ).resolves.toBe(error);

      expect(redirect).not.toHaveBeenCalled();
      expect(
        storePasswordRecoveryUsername
      ).not.toHaveBeenCalled();
    }
  );

  it("hands the service a task runner that defers to after", async () => {
    const task = vi.fn();
    vi.mocked(requestPasswordRecovery).mockImplementation(
      (_input, defer) => {
        defer(task);
        return Promise.resolve({ ok: true });
      }
    );

    await expect(
      submitUsername(RAW_USERNAME)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(after).toHaveBeenCalledOnce();
    expect(after).toHaveBeenCalledWith(task);
  });
});
