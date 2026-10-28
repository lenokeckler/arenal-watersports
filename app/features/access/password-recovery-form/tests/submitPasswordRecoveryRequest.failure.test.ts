import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { requestPasswordRecovery } from "@/app/services/password-recovery";
import { readClientNetworkKey } from "@/app/services/request";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPasswordRecoveryRequest } from "../actions/submitPasswordRecoveryRequest";
import { createPasswordRecoveryRequestFormData } from "./createPasswordRecoveryRequestFormData";
import {
  EMPTY_USERNAME,
  NETWORK_KEY,
  NETWORK_KEY_FAILURE_MESSAGE,
  RAW_USERNAME,
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

describe("submitPasswordRecoveryRequest failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(readClientNetworkKey).mockResolvedValue(
      NETWORK_KEY
    );
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
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
