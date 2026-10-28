import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { submitSignIn } from "../actions/submitSignIn";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import {
  ARIA_DISABLED_ATTRIBUTE,
  HREF_ATTRIBUTE,
  RECOVERED_NOTICE,
  RECOVERED_URL,
  TAB_INDEX_ATTRIBUTE,
} from "./LoginNotice.constants";
import { NETWORK_ERROR } from "./LoginFormView.constants";
import { deferSignInResult } from "./deferSignInResult";
import { renderLoginFormView as renderView } from "./renderLoginFormView";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

const readCurrentUrl = (): string =>
  `${window.location.pathname}${window.location.search}`;

describe("LoginFormView recovery entry", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.history.replaceState(
      window.history.state,
      document.title,
      RECOVERED_URL
    );
  });

  afterEach(() => {
    window.history.replaceState(
      window.history.state,
      document.title,
      PATHS.ACCESS.LOGIN
    );
  });

  it("links to the recovery screen right after the password field", () => {
    const page = renderView();
    const link = page.getForgotLink();

    expect(link).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.RECOVERY
    );
    expect(link).toHaveTextContent(
      LOGIN_FORM_COPY.FORGOT_PASSWORD
    );
    expect(
      page
        .getPasswordInput()
        .compareDocumentPosition(link) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      link.compareDocumentPosition(page.getIdleSubmit()) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("keeps the recovery link enabled while the sign-in is pending", async () => {
    const pendingResult = deferSignInResult();
    vi.mocked(submitSignIn).mockReturnValue(
      pendingResult.promise
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    page.getPendingSubmit();

    expect(page.getForgotLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.RECOVERY
    );
    expect(page.getForgotLink()).not.toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE
    );
    expect(page.getForgotLink()).not.toHaveAttribute(
      TAB_INDEX_ATTRIBUTE
    );
  });

  it("shows the notice and cleans the url when a notice arrives", () => {
    const page = renderView({
      noticeMessage: RECOVERED_NOTICE,
    });

    expect(page.queryNotice()).toHaveTextContent(
      RECOVERED_NOTICE
    );
    expect(readCurrentUrl()).toBe(PATHS.ACCESS.LOGIN);
  });

  it("shows no notice and keeps the url without a notice", () => {
    const page = renderView();

    expect(page.queryNotice()).not.toBeInTheDocument();
    expect(readCurrentUrl()).toBe(RECOVERED_URL);
  });

  it("lets the error banner win the slot over the notice", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView({
      noticeMessage: RECOVERED_NOTICE,
    });

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await page.findBanner();

    expect(page.queryNotice()).not.toBeInTheDocument();
  });
});
