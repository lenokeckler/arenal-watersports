import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeOwnPersonalEmail.setup";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_FIELD,
  PERSONAL_EMAIL_INTENT,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT as INPUT } from "@/app/utils/personal-email/tests/personalEmail.constants";
import { changeOwnPersonalEmail } from "../changeOwnPersonalEmail";
import { readOwnPersonalEmail } from "../readOwnPersonalEmail";
import { reauthenticateSettledWorker } from "../reauthenticateSettledWorker";
import { updateOwnPersonalEmail } from "../updateOwnPersonalEmail";
import { arrangeSuccessfulOwnPersonalEmailChange } from "./arrangeSuccessfulOwnPersonalEmailChange";
import { REMOVE_INPUT } from "./ownPersonalEmail.constants";
import { REQUIRED_OWN_PERSONAL_EMAIL } from "./ownPersonalEmail.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

describe("changeOwnPersonalEmail guards", () => {
  beforeEach(arrangeSuccessfulOwnPersonalEmailChange);

  it.each([
    PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    PERSONAL_EMAIL_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    PERSONAL_EMAIL_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
    PERSONAL_EMAIL_ERROR_CODE.SESSION_INACTIVE,
    PERSONAL_EMAIL_ERROR_CODE.NETWORK,
    PERSONAL_EMAIL_ERROR_CODE.TOO_MANY_REQUESTS,
  ])(
    "returns the %s re-authentication error and writes nothing",
    async (code) => {
      vi.mocked(
        reauthenticateSettledWorker
      ).mockResolvedValue({
        ok: false,
        error: createPasswordChangeError(code),
      });

      await expect(
        changeOwnPersonalEmail(INPUT)
      ).resolves.toEqual({
        ok: false,
        error: {
          code,
          field: PERSONAL_EMAIL_ERROR_FIELD[code],
        },
      });
      expect(
        reauthenticateSettledWorker
      ).toHaveBeenCalledOnce();
      expect(readOwnPersonalEmail).not.toHaveBeenCalled();
      expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
    }
  );

  it("reports a re-authentication code it does not know as unknown", async () => {
    vi.mocked(
      reauthenticateSettledWorker
    ).mockResolvedValue({
      ok: false,
      error: createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
      ),
    });

    await expect(
      changeOwnPersonalEmail(INPUT)
    ).resolves.toMatchObject({
      ok: false,
      error: { code: PERSONAL_EMAIL_ERROR_CODE.UNKNOWN },
    });
    expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
  });

  it("refuses to remove the address of an account that requires one", async () => {
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(
      REQUIRED_OWN_PERSONAL_EMAIL
    );

    await expect(
      changeOwnPersonalEmail(REMOVE_INPUT)
    ).resolves.toEqual({
      ok: false,
      error: {
        code: PERSONAL_EMAIL_ERROR_CODE.ADMINISTRATION_EMAIL_REQUIRED,
        field:
          PERSONAL_EMAIL_ERROR_FIELD[
            PERSONAL_EMAIL_ERROR_CODE
              .ADMINISTRATION_EMAIL_REQUIRED
          ],
      },
    });
    expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
  });

  it("lets an account that requires an address replace it", async () => {
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(
      REQUIRED_OWN_PERSONAL_EMAIL
    );

    await expect(
      changeOwnPersonalEmail(INPUT)
    ).resolves.toEqual({
      ok: true,
      intent: PERSONAL_EMAIL_INTENT.SAVE,
    });
    expect(updateOwnPersonalEmail).toHaveBeenCalledOnce();
  });

  it("reports an inactive session when the own row is gone at removal", async () => {
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(null);

    await expect(
      changeOwnPersonalEmail(REMOVE_INPUT)
    ).resolves.toMatchObject({
      ok: false,
      error: {
        code: PERSONAL_EMAIL_ERROR_CODE.SESSION_INACTIVE,
      },
    });
    expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
  });

  it("propagates a failed write", async () => {
    vi.mocked(updateOwnPersonalEmail).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      changeOwnPersonalEmail(INPUT)
    ).rejects.toThrow(RPC_FAILURE.message);
  });

  it("propagates a failed re-authentication without writing", async () => {
    vi.mocked(
      reauthenticateSettledWorker
    ).mockRejectedValue(new Error(RPC_FAILURE.message));

    await expect(
      changeOwnPersonalEmail(INPUT)
    ).rejects.toThrow(RPC_FAILURE.message);
    expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
  });
});
