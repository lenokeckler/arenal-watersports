import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { changeFirstPassword } from "../changeFirstPassword";
import { completeFirstPasswordChange } from "../completeFirstPasswordChange";
import { refreshFirstSignInSession } from "../refreshFirstSignInSession";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { verifyTemporaryPassword } from "../verifyTemporaryPassword";
import {} from "./changeFirstPassword.constants";
import {
  SUPABASE_CLIENT,
  arrangeSuccessfulPasswordChange,
} from "./arrangeSuccessfulPasswordChange";
import { FIRST_SIGN_IN_WORKER } from "./firstSignIn.constants";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);
vi.mock(
  "../readFirstSignInWorker",
  () => import("./mocks/readFirstSignInWorker.mock")
);
vi.mock(
  "../verifyTemporaryPassword",
  () => import("./mocks/verifyTemporaryPassword.mock")
);
vi.mock(
  "../updateSignedInPassword",
  () => import("./mocks/updateSignedInPassword.mock")
);
vi.mock(
  "../completeFirstPasswordChange",
  () => import("./mocks/completeFirstPasswordChange.mock")
);
vi.mock(
  "../refreshFirstSignInSession",
  () => import("./mocks/refreshFirstSignInSession.mock")
);

const INPUT = DEFAULT_FIRST_PASSWORD_CHANGE_INPUT;

describe("changeFirstPassword", () => {
  beforeEach(arrangeSuccessfulPasswordChange);

  it("changes the password and refreshes the session in order", async () => {
    await expect(
      changeFirstPassword(INPUT)
    ).resolves.toEqual({ ok: true });

    expect(verifyTemporaryPassword).toHaveBeenCalledWith(
      FIRST_SIGN_IN_WORKER,
      INPUT.currentPassword
    );
    expect(updateSignedInPassword).toHaveBeenCalledWith(
      SUPABASE_CLIENT,
      INPUT.newPassword
    );
    expect(
      completeFirstPasswordChange
    ).toHaveBeenCalledOnce();
    expect(
      completeFirstPasswordChange
    ).toHaveBeenCalledWith(FIRST_SIGN_IN_WORKER.id);
    expect(
      refreshFirstSignInSession
    ).toHaveBeenCalledOnce();
    expect(refreshFirstSignInSession).toHaveBeenCalledWith(
      SUPABASE_CLIENT
    );
    expect(
      vi.mocked(updateSignedInPassword).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      vi.mocked(completeFirstPasswordChange).mock
        .invocationCallOrder[0]
    );
  });
});
