import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { requestPasswordRecovery } from "@/app/services/password-recovery";
import { readClientNetworkKey } from "@/app/services/request";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPasswordRecoveryRequest } from "../actions/submitPasswordRecoveryRequest";
import { createPasswordRecoveryRequestFormData } from "./createPasswordRecoveryRequestFormData";
import {
  EMPTY_USERNAME,
  INJECTED_USERNAME,
  NETWORK_KEY,
  NETWORK_KEY_FAILURE_MESSAGE,
  RAW_USERNAME,
  RESET_PATH_FOR_INJECTED,
  RESET_PATH_FOR_NORMALIZED,
  RETURNED_ERRORS,
  SERVICE_FAILURE_MESSAGE,
  UNKNOWN_ERROR,
} from "./passwordRecoveryRequest.constants";

vi.mock("@/app/services/password-recovery", () => ({
  requestPasswordRecovery: vi.fn(),
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

  it("redirects to the reset screen with the normalized username", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitUsername(RAW_USERNAME)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(
      RESET_PATH_FOR_NORMALIZED
    );
  });

  it("encodes the username so it cannot add query parameters", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: true,
    });

    await expect(
      submitUsername(INJECTED_USERNAME)
    ).rejects.toThrow(REDIRECT_SIGNAL_MESSAGE);

    expect(redirect).toHaveBeenCalledWith(
      RESET_PATH_FOR_INJECTED
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

  it("answers unknown and never calls the service when the network key cannot be read", async () => {
    vi.mocked(readClientNetworkKey).mockRejectedValue(
      new Error(NETWORK_KEY_FAILURE_MESSAGE)
    );

    await expect(
      submitUsername(RAW_USERNAME)
    ).resolves.toEqual(UNKNOWN_ERROR);

    expect(requestPasswordRecovery).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("answers unknown when the service throws", async () => {
    vi.mocked(requestPasswordRecovery).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(
      submitUsername(RAW_USERNAME)
    ).resolves.toEqual(UNKNOWN_ERROR);

    expect(redirect).not.toHaveBeenCalled();
  });

  it("reads a missing username as empty", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: false,
      error: UNKNOWN_ERROR,
    });

    await submitPasswordRecoveryRequest(
      null,
      new FormData()
    );

    expect(requestPasswordRecovery).toHaveBeenCalledWith(
      { networkKey: NETWORK_KEY, username: EMPTY_USERNAME },
      expect.any(Function)
    );
  });

  it("ignores the previous error", async () => {
    vi.mocked(requestPasswordRecovery).mockResolvedValue({
      ok: false,
      error: UNKNOWN_ERROR,
    });

    await expect(
      submitPasswordRecoveryRequest(
        RETURNED_ERRORS[0],
        createPasswordRecoveryRequestFormData(RAW_USERNAME)
      )
    ).resolves.toBe(UNKNOWN_ERROR);
  });
});
