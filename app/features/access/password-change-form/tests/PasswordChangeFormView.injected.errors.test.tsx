import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";
import {
  DEFAULT_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
} from "@/app/utils/password-change/tests/passwordChange.constants";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  NETWORK_ERROR,
} from "./passwordChangeErrors.constants";
import { OWN_PASSWORD_CHANGE_ERROR_COPY as errorCopy } from "./PasswordChangeFormView.injected.constants";
import { renderInjectedPasswordChangeFormView as renderView } from "./PasswordChangeFormView.injected.page";

describe("PasswordChangeFormView injected error copy", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows a validation error with the injected error copy", async () => {
    const page = renderView(vi.fn());

    await page.fill({
      ...DEFAULT_PASSWORD_CHANGE_INPUT,
      confirmPassword: MISMATCHED_CONFIRMATION,
    });
    await page.submit();

    expect(
      await page.findText(
        errorCopy[
          PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
        ]
      )
    ).toBeInTheDocument();
  });

  it("shows a field server error with the injected error copy", async () => {
    const page = renderView(
      vi
        .fn()
        .mockResolvedValue(CURRENT_PASSWORD_INVALID_ERROR)
    );

    await page.fill();
    await page.submit();

    expect(
      await page.findText(
        errorCopy[CURRENT_PASSWORD_INVALID_ERROR.code]
      )
    ).toBeInTheDocument();
  });

  it("shows the form banner with the injected error copy", async () => {
    const page = renderView(
      vi.fn().mockResolvedValue(NETWORK_ERROR)
    );

    await page.fill();
    await page.submit();

    expect(await page.findBanner()).toHaveTextContent(
      errorCopy[NETWORK_ERROR.code]
    );
  });
});
