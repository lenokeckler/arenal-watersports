import { screen, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import type { PasswordChangeServerAction } from "../models/PasswordChangeServerAction.type";
import { NETWORK_ERROR } from "./passwordChangeErrors.constants";
import {
  OWN_PASSWORD_CHANGE_COPY as copy,
  PLACEHOLDER_FIELD_COUNT,
} from "./PasswordChangeFormView.injected.constants";
import { renderInjectedPasswordChangeFormView as renderView } from "./PasswordChangeFormView.injected.page";

describe("PasswordChangeFormView with injected contracts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the labels, placeholder and submit label of the copy it receives", () => {
    const page = renderView(vi.fn());

    expect(page.getInputs()).toHaveLength(
      PLACEHOLDER_FIELD_COUNT
    );
    expect(page.getSubmit(copy.SUBMIT)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(
        FIRST_SIGN_IN_FORM_COPY.NEW_PASSWORD_LABEL
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(FIRST_SIGN_IN_FORM_COPY.SUBMIT)
    ).not.toBeInTheDocument();
  });

  it("shows the pending label of the copy it receives while saving", async () => {
    let settle: () => void = () => undefined;
    const action = vi.fn<PasswordChangeServerAction>(
      () =>
        new Promise((resolve) => {
          settle = () => resolve(null);
        })
    );
    const page = renderView(action);

    await page.fill();
    await page.submit();

    await waitFor(() =>
      expect(
        page.getSubmit(copy.SUBMITTING)
      ).toBeInTheDocument()
    );
    settle();
    await waitFor(() =>
      expect(
        page.getSubmit(copy.SUBMIT)
      ).toBeInTheDocument()
    );
  });

  it("invokes the injected action and never the first sign-in one", async () => {
    const action: PasswordChangeServerAction = vi
      .fn()
      .mockResolvedValue(null);
    const page = renderView(action);

    await page.fill();
    await page.submit();

    await waitFor(() =>
      expect(action).toHaveBeenCalledOnce()
    );
    expect(
      submitFirstPasswordChange
    ).not.toHaveBeenCalled();
  });

  it("ignores a second press of submit while the injected action is pending", async () => {
    let settle: () => void = () => undefined;
    const action = vi.fn<PasswordChangeServerAction>(
      () =>
        new Promise((resolve) => {
          settle = () => resolve(NETWORK_ERROR);
        })
    );
    const page = renderView(action);

    await page.fill();
    await page.submit();
    await waitFor(() =>
      expect(
        page.getSubmit(copy.SUBMITTING)
      ).toBeInTheDocument()
    );
    await page.submitWhilePending();
    settle();

    await page.findBanner();
    expect(action).toHaveBeenCalledOnce();
  });
});
