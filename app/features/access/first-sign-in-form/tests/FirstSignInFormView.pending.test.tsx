import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./firstSignInAction.setup";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { NETWORK_ERROR } from "./firstSignInErrors.constants";
import { renderFirstSignInFormView as renderView } from "./renderFirstSignInFormView";

const startPendingSubmit = async () => {
  let settle: () => void = () => undefined;
  vi.mocked(submitFirstPasswordChange)
    .mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          settle = () => resolve(NETWORK_ERROR);
        })
    )
    .mockResolvedValue(NETWORK_ERROR);
  const page = renderView();
  await page.fill(DEFAULT_FIRST_PASSWORD_CHANGE_INPUT);
  await page.submit();
  await waitFor(() =>
    expect(page.getPendingSubmit()).toBeInTheDocument()
  );
  return { page, settle: () => settle() };
};

describe("FirstSignInFormView while saving", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("ignores a second press of the submit button", async () => {
    const { page, settle } = await startPendingSubmit();

    await page.submitWhilePending();
    settle();

    await waitFor(() =>
      expect(page.queryPendingSubmit()).toBeNull()
    );
    await page.findBanner();
    expect(
      submitFirstPasswordChange
    ).toHaveBeenCalledOnce();
  });

  it("ignores Enter pressed in a field", async () => {
    const { page, settle } = await startPendingSubmit();

    await page.pressEnterInConfirm();
    settle();

    await waitFor(() =>
      expect(page.queryPendingSubmit()).toBeNull()
    );
    await page.findBanner();
    expect(
      submitFirstPasswordChange
    ).toHaveBeenCalledOnce();
  });
});
