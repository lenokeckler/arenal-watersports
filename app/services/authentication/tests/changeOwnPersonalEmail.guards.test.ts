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
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import { DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT as INPUT } from "@/app/utils/personal-email/tests/personalEmail.constants";
import { changeOwnPersonalEmail } from "../changeOwnPersonalEmail";
import { reauthenticateSettledWorker } from "../reauthenticateSettledWorker";
import { updateOwnPersonalEmail } from "../updateOwnPersonalEmail";
import { arrangeSuccessfulOwnPersonalEmailChange } from "./arrangeSuccessfulOwnPersonalEmailChange";
import {
  REAUTHENTICATION_FAILURE_CODES,
  REMOVE_INPUT,
} from "./changeOwnPersonalEmail.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

describe("changeOwnPersonalEmail guards", () => {
  beforeEach(arrangeSuccessfulOwnPersonalEmailChange);

  describe.each([
    ["save", INPUT],
    ["remove", REMOVE_INPUT],
  ])("on the %s intent", (_intent, input) => {
    it.each(REAUTHENTICATION_FAILURE_CODES)(
      "returns the %s re-authentication error and writes nothing",
      async (code) => {
        vi.mocked(
          reauthenticateSettledWorker
        ).mockResolvedValue({
          ok: false,
          error: createPasswordChangeError(code),
        });

        await expect(
          changeOwnPersonalEmail(input)
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
        expect(
          updateOwnPersonalEmail
        ).not.toHaveBeenCalled();
      }
    );

    it("reports a re-authentication code it does not know as unknown and writes nothing", async () => {
      vi.mocked(
        reauthenticateSettledWorker
      ).mockResolvedValue({
        ok: false,
        error: createPasswordChangeError(
          PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
        ),
      });

      await expect(
        changeOwnPersonalEmail(input)
      ).resolves.toMatchObject({
        ok: false,
        error: { code: PERSONAL_EMAIL_ERROR_CODE.UNKNOWN },
      });
      expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
    });

    it("propagates a failed re-authentication without writing", async () => {
      vi.mocked(
        reauthenticateSettledWorker
      ).mockRejectedValue(new Error(RPC_FAILURE.message));

      await expect(
        changeOwnPersonalEmail(input)
      ).rejects.toThrow(RPC_FAILURE.message);
      expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
    });
  });

  it("re-authenticates before checking whether the account may remove its address", async () => {
    vi.mocked(
      reauthenticateSettledWorker
    ).mockResolvedValue({
      ok: false,
      error: createPasswordChangeError(
        PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
      ),
    });

    await expect(
      changeOwnPersonalEmail(REMOVE_INPUT)
    ).resolves.toMatchObject({
      ok: false,
      error: {
        code: PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID,
      },
    });
    expect(updateOwnPersonalEmail).not.toHaveBeenCalled();
  });
});
