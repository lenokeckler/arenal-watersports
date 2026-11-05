import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, SIGN_IN_ERROR_CODE } from "@/app/constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { submitSignIn } from "../actions/submitSignIn";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { HREF_ATTRIBUTE } from "./LoginNotice.constants";
import {
  NETWORK_ERROR,
  RECOVERY_REQUIRED_ERROR,
} from "./LoginFormView.constants";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";
import { renderLoginFormView as renderView } from "./renderLoginFormView";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("LoginFormView recovery offer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows no offer before any sign-in", () => {
    const page = renderView();

    expect(
      page.queryRecoveryOffer()
    ).not.toBeInTheDocument();
  });

  it("links the offer to the recovery screen without a query string", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      RECOVERY_REQUIRED_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();

    expect(await page.findRecoveryOffer()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.RECOVERY
    );
  });

  it("places the offer between the alert and the form", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      RECOVERY_REQUIRED_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    const offer = await page.findRecoveryOffer();

    expect(
      (await page.findBanner()).compareDocumentPosition(
        offer
      ) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      offer.compareDocumentPosition(
        page.getUsernameInput()
      ) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("keeps the permanent forgot link next to the offer", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      RECOVERY_REQUIRED_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await page.findRecoveryOffer();

    expect(page.getForgotLink()).toHaveAttribute(
      HREF_ATTRIBUTE,
      PATHS.ACCESS.RECOVERY
    );
  });

  it("shows no offer for a wrong password", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await page.findText(
      SIGN_IN_ERROR_COPY[
        SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
      ]
    );

    expect(
      page.queryRecoveryOffer()
    ).not.toBeInTheDocument();
  });

  it("shows no offer for a network error", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await page.findBanner();

    expect(
      page.queryRecoveryOffer()
    ).not.toBeInTheDocument();
  });

  it("removes the offer when the next sign-in fails with another error", async () => {
    vi.mocked(submitSignIn)
      .mockResolvedValueOnce(RECOVERY_REQUIRED_ERROR)
      .mockResolvedValueOnce(NETWORK_ERROR);
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await page.findRecoveryOffer();
    await page.submit();

    await vi.waitFor(() =>
      expect(
        page.queryRecoveryOffer()
      ).not.toBeInTheDocument()
    );
  });
});
