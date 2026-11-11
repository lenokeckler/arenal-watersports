import { INPUT_TYPES } from "@/app/constants";
import {
  E2E_LOGIN_ATTRIBUTE,
  E2E_LOGIN_TOGGLE_LABEL,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/activeWorkerTest";

test.describe("Login password visibility", () => {
  test("toggles the password input type and the toggle label", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await expect(
      loginPage.getPasswordInput()
    ).toHaveAttribute(
      E2E_LOGIN_ATTRIBUTE.TYPE,
      INPUT_TYPES.PASSWORD
    );

    await loginPage.togglePasswordVisibility(
      E2E_LOGIN_TOGGLE_LABEL.SHOW
    );

    await expect(
      loginPage.getPasswordInput()
    ).toHaveAttribute(
      E2E_LOGIN_ATTRIBUTE.TYPE,
      INPUT_TYPES.TEXT
    );
    await expect(
      loginPage.getPasswordToggle(
        E2E_LOGIN_TOGGLE_LABEL.HIDE
      )
    ).toBeVisible();

    await loginPage.togglePasswordVisibility(
      E2E_LOGIN_TOGGLE_LABEL.HIDE
    );

    await expect(
      loginPage.getPasswordInput()
    ).toHaveAttribute(
      E2E_LOGIN_ATTRIBUTE.TYPE,
      INPUT_TYPES.PASSWORD
    );
  });
});
