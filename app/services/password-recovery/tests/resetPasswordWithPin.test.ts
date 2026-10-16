import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { setWorkerPassword } from "@/app/services/authentication";
import { consumePasswordResetPin } from "../consumePasswordResetPin";
import { deliverPasswordChangedNotice } from "../deliverPasswordChangedNotice";
import { finishPasswordRecovery } from "../finishPasswordRecovery";
import { resetPasswordWithPin } from "../resetPasswordWithPin";
import {
  OTHER_PASSWORD_ERROR,
  RESET_FINISH_FAILURE_MESSAGE,
  RESET_INPUT,
  RESET_MISMATCHED_PASSWORD,
  RESET_NEW_PASSWORD,
  RESET_NORMALIZED_PIN,
  RESET_SHORT_PIN,
  RESET_SET_FAILURE_MESSAGE,
  RESET_WEAK_PASSWORD,
  RESET_WORKER_ID,
  RULES_PASSWORD_ERROR,
} from "./passwordRecoveryReset.constants";
import {
  DEFER_FAILURE_MESSAGE,
  INVALID_USERNAME,
  NORMALIZED_USERNAME,
  RPC_FAILURE,
} from "./passwordRecovery.constants";

vi.mock("../consumePasswordResetPin", () => ({
  consumePasswordResetPin: vi.fn(),
}));
vi.mock("../finishPasswordRecovery", () => ({
  finishPasswordRecovery: vi.fn(),
}));
vi.mock("../deliverPasswordChangedNotice", () => ({
  deliverPasswordChangedNotice: vi.fn(),
}));
vi.mock("@/app/services/authentication", () => ({
  setWorkerPassword: vi.fn(),
}));

const defer = vi.fn();

const reset = (
  overrides: Partial<typeof RESET_INPUT> = {}
) =>
  resetPasswordWithPin(
    { ...RESET_INPUT, ...overrides },
    defer
  );

describe("resetPasswordWithPin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(consumePasswordResetPin).mockResolvedValue(
      RESET_WORKER_ID
    );
    vi.mocked(setWorkerPassword).mockResolvedValue(null);
    vi.mocked(finishPasswordRecovery).mockResolvedValue(
      undefined
    );
    vi.mocked(
      deliverPasswordChangedNotice
    ).mockResolvedValue(undefined);
  });

  it.each([
    [
      "a weak password",
      { newPassword: RESET_WEAK_PASSWORD },
    ],
    [
      "a mismatched confirmation",
      { confirmPassword: RESET_MISMATCHED_PASSWORD },
    ],
    ["an empty username", { username: INVALID_USERNAME }],
    ["a malformed pin", { pin: RESET_SHORT_PIN }],
  ])(
    "rejects %s before touching the pin",
    async (_label, overrides) => {
      const result = await reset(overrides);

      expect(result).toMatchObject({ ok: false });
      expect(
        consumePasswordResetPin
      ).not.toHaveBeenCalled();
      expect(setWorkerPassword).not.toHaveBeenCalled();
      expect(finishPasswordRecovery).not.toHaveBeenCalled();
      expect(defer).not.toHaveBeenCalled();
    }
  );

  it("consumes the pin with the username and the pin from the input", async () => {
    await reset();

    expect(consumePasswordResetPin).toHaveBeenCalledWith({
      pin: RESET_INPUT.pin,
      username: RESET_INPUT.username,
    });
  });

  it("answers the generic pin error without setting a password when no pin matched", async () => {
    vi.mocked(consumePasswordResetPin).mockResolvedValue(
      null
    );

    const result = await reset();

    expect(result).toMatchObject({
      error: {
        code: PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID,
      },
      ok: false,
    });
    expect(setWorkerPassword).not.toHaveBeenCalled();
    expect(finishPasswordRecovery).not.toHaveBeenCalled();
    expect(defer).not.toHaveBeenCalled();
  });

  it("answers unknown when consuming the pin fails", async () => {
    vi.mocked(consumePasswordResetPin).mockRejectedValue(
      RPC_FAILURE
    );

    const result = await reset();

    expect(result).toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
    expect(setWorkerPassword).not.toHaveBeenCalled();
    expect(finishPasswordRecovery).not.toHaveBeenCalled();
  });

  it("sets the password of the worker the pin belonged to", async () => {
    await reset();

    expect(setWorkerPassword).toHaveBeenCalledWith(
      RESET_WORKER_ID,
      RESET_NEW_PASSWORD
    );
  });

  it("maps a password rules failure and never finishes", async () => {
    vi.mocked(setWorkerPassword).mockResolvedValue(
      RULES_PASSWORD_ERROR
    );

    const result = await reset();

    expect(result).toMatchObject({
      error: {
        code: PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES,
      },
      ok: false,
    });
    expect(finishPasswordRecovery).not.toHaveBeenCalled();
    expect(defer).not.toHaveBeenCalled();
  });

  it("maps any other password failure to unknown and never finishes", async () => {
    vi.mocked(setWorkerPassword).mockResolvedValue(
      OTHER_PASSWORD_ERROR
    );

    const result = await reset();

    expect(result).toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
    expect(finishPasswordRecovery).not.toHaveBeenCalled();
  });

  it("answers unknown and never finishes when setting the password throws", async () => {
    vi.mocked(setWorkerPassword).mockRejectedValue(
      new Error(RESET_SET_FAILURE_MESSAGE)
    );

    const result = await reset();

    expect(result).toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
    expect(finishPasswordRecovery).not.toHaveBeenCalled();
    expect(defer).not.toHaveBeenCalled();
  });

  it("finishes the recovery for the worker after the password is saved", async () => {
    await reset();

    expect(finishPasswordRecovery).toHaveBeenCalledWith(
      RESET_WORKER_ID
    );
    expect(
      vi.mocked(setWorkerPassword).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      vi.mocked(finishPasswordRecovery).mock
        .invocationCallOrder[0]
    );
  });

  it("answers unknown without a notice when finishing fails", async () => {
    vi.mocked(finishPasswordRecovery).mockRejectedValue(
      new Error(RESET_FINISH_FAILURE_MESSAGE)
    );

    const result = await reset();

    expect(result).toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
    expect(defer).not.toHaveBeenCalled();
  });

  it("defers one notice for the worker and answers ok", async () => {
    const result = await reset();

    expect(result).toEqual({ ok: true });
    expect(defer).toHaveBeenCalledOnce();

    const [task] = defer.mock.calls[0];
    await task();

    expect(
      deliverPasswordChangedNotice
    ).toHaveBeenCalledWith(RESET_WORKER_ID);
  });

  it("still answers ok when deferring throws", async () => {
    defer.mockImplementation(() => {
      throw new Error(DEFER_FAILURE_MESSAGE);
    });

    const result = await reset();

    expect(result).toEqual({ ok: true });
  });

  it("never exposes the password, the pin or the username in any result", async () => {
    vi.mocked(consumePasswordResetPin).mockResolvedValue(
      null
    );
    const failure = JSON.stringify(await reset());
    vi.mocked(consumePasswordResetPin).mockResolvedValue(
      RESET_WORKER_ID
    );
    const success = JSON.stringify(await reset());

    [failure, success].forEach((serialized) => {
      expect(serialized).not.toContain(RESET_NEW_PASSWORD);
      expect(serialized).not.toContain(
        RESET_NORMALIZED_PIN
      );
      expect(serialized).not.toContain(NORMALIZED_USERNAME);
      expect(serialized).not.toContain(RESET_WORKER_ID);
    });
  });
});
