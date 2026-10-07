import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { submitSignIn } from "../actions/submitSignIn";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import {
  EXTRA_USERNAME_TEXT,
  KEYBOARD_TEXT,
  MULTI_CHARACTER_USERNAME,
  NETWORK_ERROR,
} from "./LoginFormView.constants";
import { INVALID_CREDENTIALS_ERROR } from "./submitSignIn.constants";
import { renderLoginFormView as renderView } from "./renderLoginFormView";

vi.mock("../actions/submitSignIn", () => ({
  submitSignIn: vi.fn(),
}));

describe("LoginFormView focus", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("focuses the username after an empty submit", async () => {
    const page = renderView();

    await page.submit();

    await waitFor(() =>
      expect(page.getUsernameInput()).toHaveFocus()
    );
  });

  it("keeps the focus on the username while typing after an empty submit", async () => {
    const page = renderView();

    await page.submit();
    await waitFor(() =>
      expect(page.getUsernameInput()).toHaveFocus()
    );
    await page.typeUsername(MULTI_CHARACTER_USERNAME);

    expect(page.getUsernameInput()).toHaveFocus();
    expect(page.getUsernameInput()).toHaveValue(
      MULTI_CHARACTER_USERNAME
    );
    expect(page.getPasswordInput()).not.toHaveFocus();
  });

  it("focuses the password on invalid credentials and keeps focus while typing", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();

    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );

    await page.typeUsername(EXTRA_USERNAME_TEXT);

    expect(page.getUsernameInput()).toHaveFocus();
  });

  it("keeps the focus on the password while typing after invalid credentials", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );
    await page.typeWithoutClicking(KEYBOARD_TEXT);

    expect(page.getPasswordInput()).toHaveFocus();
    expect(page.getUsernameInput()).not.toHaveFocus();
  });

  it("focuses the password again when a second submit returns the same error", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      INVALID_CREDENTIALS_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );
    await page.typeUsername(EXTRA_USERNAME_TEXT);
    await page.submit();

    await waitFor(() =>
      expect(page.getPasswordInput()).toHaveFocus()
    );
    expect(submitSignIn).toHaveBeenCalledTimes(2);
  });

  it("does not move the focus when the result is stale", async () => {
    let resolveSignIn: (
      error: typeof INVALID_CREDENTIALS_ERROR
    ) => void = () => undefined;
    vi.mocked(submitSignIn).mockReturnValue(
      new Promise((resolve) => {
        resolveSignIn = resolve;
      })
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await page.typeUsername(EXTRA_USERNAME_TEXT);
    resolveSignIn(INVALID_CREDENTIALS_ERROR);

    await waitFor(() =>
      expect(page.getIdleSubmit()).toBeInTheDocument()
    );
    expect(page.getUsernameInput()).toHaveFocus();
    expect(page.getPasswordInput()).not.toHaveFocus();
  });

  it("does not move the focus to a field for a network error", async () => {
    vi.mocked(submitSignIn).mockResolvedValue(
      NETWORK_ERROR
    );
    const page = renderView();

    await page.fillCredentials(DEFAULT_SIGN_IN_CREDENTIALS);
    await page.submit();
    await page.findBanner();

    expect(page.getUsernameInput()).not.toHaveFocus();
    expect(page.getPasswordInput()).not.toHaveFocus();
  });
});
