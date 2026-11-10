import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { redirectWhenSignInBlocked } from "../redirectWhenSignInBlocked";
import { REDIRECT_SIGNAL_MESSAGE } from "./redirectSignal.constants";
import {
  BLOCKED_LOGIN_CASES,
  NOT_BLOCKED_CODES,
} from "./redirectWhenSignInBlocked.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("redirectWhenSignInBlocked", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

  it.each(BLOCKED_LOGIN_CASES)(
    "redirects to the login notice when the error is %s",
    (code, target) => {
      expect(() =>
        redirectWhenSignInBlocked({ code })
      ).toThrow(REDIRECT_SIGNAL_MESSAGE);

      expect(redirect).toHaveBeenCalledOnce();
      expect(redirect).toHaveBeenCalledWith(target);
    }
  );

  it.each(NOT_BLOCKED_CODES)(
    "does not redirect when the error is %s",
    (code) => {
      redirectWhenSignInBlocked({ code });

      expect(redirect).not.toHaveBeenCalled();
    }
  );
});
