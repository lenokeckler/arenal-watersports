import { INPUT_TYPES, PATHS } from "@/app/constants";
import {
  E2E_LOGIN_ACCOUNT,
  E2E_LOGIN_ATTRIBUTE,
  E2E_LOGIN_COPY,
  E2E_LOGIN_FIELD_ID,
  E2E_LOGIN_TOGGLE_LABEL,
  E2E_LOGIN_TOGGLE_MIN_SIZE_PX,
  E2E_LOGIN_WRONG_PASSWORD,
} from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import { expect, test } from "../support/activeWorkerTest";

test.describe("Login", () => {
  test("shows the title, both labelled fields and the submit button", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);

    await loginPage.goTo();

    await expect(loginPage.getHeading()).toHaveText(
      E2E_LOGIN_COPY.HEADING
    );
    await expect(
      loginPage.getUsernameInput()
    ).toBeVisible();
    await expect(
      loginPage.getPasswordInput()
    ).toBeVisible();
    await expect(loginPage.getSubmitButton()).toBeVisible();
  });

  test("shows the username error and focuses the username on an empty submit", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();

    await loginPage.submit();

    await expect(loginPage.getUsernameError()).toHaveText(
      E2E_LOGIN_COPY.USERNAME_REQUIRED
    );
    await expect(
      loginPage.getUsernameInput()
    ).toHaveAttribute(
      E2E_LOGIN_ATTRIBUTE.DESCRIBED_BY,
      loginPage.getFieldErrorId(E2E_LOGIN_FIELD_ID.USERNAME)
    );
    await expect(
      loginPage.getUsernameInput()
    ).toBeFocused();
  });

  test("shows the credentials error under the password and focuses it on a wrong password", async ({
    activeWorker,
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(activeWorker.username);
    await loginPage.fillPassword(E2E_LOGIN_WRONG_PASSWORD);

    await loginPage.submit();

    await expect(loginPage.getPasswordError()).toHaveText(
      E2E_LOGIN_COPY.INVALID_CREDENTIALS
    );
    await expect(
      loginPage.getPasswordInput()
    ).toHaveAttribute(
      E2E_LOGIN_ATTRIBUTE.DESCRIBED_BY,
      loginPage.getFieldErrorId(E2E_LOGIN_FIELD_ID.PASSWORD)
    );
    await expect(
      loginPage.getPasswordInput()
    ).toBeFocused();
  });

  test("gives the password toggle a tap area of at least 48 px", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();

    const box = await loginPage
      .getPasswordToggle(E2E_LOGIN_TOGGLE_LABEL.SHOW)
      .boundingBox();

    expect(box?.width).toBeGreaterThanOrEqual(
      E2E_LOGIN_TOGGLE_MIN_SIZE_PX
    );
    expect(box?.height).toBeGreaterThanOrEqual(
      E2E_LOGIN_TOGGLE_MIN_SIZE_PX
    );
  });

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

  test("signs in the seeded account and lands on the home page", async ({
    page,
  }) => {
    const loginPage = createLoginPage(page);
    await loginPage.goTo();
    await loginPage.fillUsername(
      E2E_LOGIN_ACCOUNT.USERNAME
    );
    await loginPage.fillPassword(
      E2E_LOGIN_ACCOUNT.PASSWORD
    );

    await loginPage.submit();

    await expect(page).toHaveURL(PATHS.HOME);
  });
});
