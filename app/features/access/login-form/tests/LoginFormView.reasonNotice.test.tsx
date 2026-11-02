import { describe, expect, it } from "vitest";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { renderLoginFormView } from "./renderLoginFormView";
import { INACTIVITY_NOTICE } from "./resolveLoginFormErrors.constants";

describe("LoginFormView notice", () => {
  it("announces the notice in the banner", async () => {
    const page = renderLoginFormView({
      notice: INACTIVITY_NOTICE,
    });

    expect(await page.findBanner()).toHaveTextContent(
      SIGN_IN_ERROR_COPY[INACTIVITY_NOTICE.code]
    );
  });
});
