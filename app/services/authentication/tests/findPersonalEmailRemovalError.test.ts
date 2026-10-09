import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./changeOwnPersonalEmail.setup";
import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { findPersonalEmailRemovalError } from "../findPersonalEmailRemovalError";
import { readOwnPersonalEmail } from "../readOwnPersonalEmail";
import { arrangeSuccessfulOwnPersonalEmailChange } from "./arrangeSuccessfulOwnPersonalEmailChange";
import {
  OPTIONAL_OWN_PERSONAL_EMAIL,
  REQUIRED_OWN_PERSONAL_EMAIL,
} from "./ownPersonalEmail.constants";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";

describe("findPersonalEmailRemovalError", () => {
  beforeEach(arrangeSuccessfulOwnPersonalEmailChange);

  it("finds nothing when the account does not require an address", async () => {
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(
      OPTIONAL_OWN_PERSONAL_EMAIL
    );

    await expect(
      findPersonalEmailRemovalError(
        SUPABASE_CLIENT as never
      )
    ).resolves.toBeNull();
  });

  it("finds the administration requirement when the account requires an address", async () => {
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(
      REQUIRED_OWN_PERSONAL_EMAIL
    );

    await expect(
      findPersonalEmailRemovalError(
        SUPABASE_CLIENT as never
      )
    ).resolves.toEqual(
      createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.ADMINISTRATION_EMAIL_REQUIRED
      )
    );
  });

  it("finds an inactive session when the own row is gone", async () => {
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(null);

    await expect(
      findPersonalEmailRemovalError(
        SUPABASE_CLIENT as never
      )
    ).resolves.toEqual(
      createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.SESSION_INACTIVE
      )
    );
  });
});
