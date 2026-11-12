import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeOwnPersonalEmail.setup";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_ERROR_FIELD,
  PERSONAL_EMAIL_INTENT,
} from "@/app/constants";
import { DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT as INPUT } from "@/app/utils/personal-email/tests/personalEmail.constants";
import { changeOwnPersonalEmail } from "../changeOwnPersonalEmail";
import { reauthenticateSettledWorker } from "../reauthenticateSettledWorker";
import { updateOwnPersonalEmail } from "../updateOwnPersonalEmail";
import { arrangeSuccessfulOwnPersonalEmailChange } from "./arrangeSuccessfulOwnPersonalEmailChange";
import { REMOVE_INPUT } from "./changeOwnPersonalEmail.constants";
import { ADMINISTRATION_WORKER } from "./ownPersonalEmail.constants";
import { RPC_FAILURE } from "./recordSignIn.constants";

describe("changeOwnPersonalEmail removal", () => {
  beforeEach(() => {
    arrangeSuccessfulOwnPersonalEmailChange();
    vi.mocked(
      reauthenticateSettledWorker
    ).mockResolvedValue({
      ok: true,
      worker: ADMINISTRATION_WORKER,
    });
  });

  it("refuses to remove the address of an account that requires one", async () => {
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
    await expect(
      changeOwnPersonalEmail(INPUT)
    ).resolves.toEqual({
      ok: true,
      intent: PERSONAL_EMAIL_INTENT.SAVE,
    });
    expect(updateOwnPersonalEmail).toHaveBeenCalledOnce();
  });

  it("propagates a failed write", async () => {
    vi.mocked(updateOwnPersonalEmail).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(
      changeOwnPersonalEmail(INPUT)
    ).rejects.toThrow(RPC_FAILURE.message);
  });
});
