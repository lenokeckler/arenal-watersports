import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { submitSignIn } from "../actions/submitSignIn";
import { submitSignInForm } from "../actions/submitSignInForm";
import { createSignInFormData } from "./createSignInFormData";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("submitSignInForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("signs in with the credentials of the posted form and returns its error", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );

    await expect(
      submitSignInForm(
        null,
        createSignInFormData(DEFAULT_SIGN_IN_CREDENTIALS)
      )
    ).resolves.toEqual(INVALID_CREDENTIALS_ERROR);

    expect(submitSignIn).toHaveBeenCalledWith(
      DEFAULT_SIGN_IN_CREDENTIALS
    );
  });
});
