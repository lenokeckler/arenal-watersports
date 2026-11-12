import { expect, test as base } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import {
  E2E_EXTERNAL_GUIDE,
  E2E_EXTERNAL_GUIDE_SCREENSHOT_BASENAME,
} from "../constants/E2eExternalGuideRegistration.constants";
import { createExternalGuideRegistrationPage } from "../pages/ExternalGuideRegistration.page";
import { createLoginPage } from "../pages/Login.page";
import { buildE2eUsername } from "../support/buildE2eUsername";
import { buildExternalGuideExpiryDate } from "../support/buildExternalGuideExpiryDate";
import { captureFullPage } from "../support/captureFullPage";
import { createExternalGuideRegistrar } from "../support/createExternalGuideRegistrar";
import { removeRegisteredWorker } from "../support/removeRegisteredWorker";
import type { ExternalGuideRegistrar } from "../support/models/ExternalGuideRegistrar.interface";

const test = base.extend<{
  registrar: ExternalGuideRegistrar;
  nationalId: string;
}>({
  registrar: async ({ context }, provide) => {
    const registrar =
      await createExternalGuideRegistrar(true);
    await provide(registrar);
    await context.clearCookies();
    await registrar.remove();
  },
  nationalId: async (
    { context, registrar: _registrar },
    provide
  ) => {
    const nationalId = buildE2eUsername();
    await provide(nationalId);
    await context.clearCookies();
    await removeRegisteredWorker(nationalId);
  },
});

test("captures the registration form and temporary password result", async ({
  nationalId,
  page,
  registrar,
}, testInfo) => {
  const loginPage = createLoginPage(page);
  const registrationPage =
    createExternalGuideRegistrationPage(page);

  await loginPage.goTo();
  await loginPage.fillUsername(registrar.username);
  await loginPage.fillPassword(registrar.password);
  await loginPage.submit();
  await page.waitForURL(PATHS.HOME);
  await registrationPage.goTo();
  const registrationMain = await page
    .getByRole(ARIA_ROLE.MAIN)
    .last()
    .boundingBox();
  expect(registrationMain?.width).toBeGreaterThan(300);
  const registrationContent = await page
    .getByRole(ARIA_ROLE.MAIN)
    .last()
    .locator(":scope > div")
    .boundingBox();
  expect(registrationContent?.width).toBeGreaterThan(300);
  await expect(
    registrationPage.getSubmitButton()
  ).toBeVisible();
  await captureFullPage(
    page,
    E2E_EXTERNAL_GUIDE_SCREENSHOT_BASENAME.FORM,
    testInfo.project.name
  );

  await registrationPage.register({
    expiresOn: buildExternalGuideExpiryDate(),
    fullName: E2E_EXTERNAL_GUIDE.GUIDE_NAME,
    nationalId,
  });
  await expect(
    registrationPage.getRegisteredNotice(
      E2E_EXTERNAL_GUIDE.GUIDE_NAME,
      nationalId
    )
  ).toBeVisible();
  await captureFullPage(
    page,
    E2E_EXTERNAL_GUIDE_SCREENSHOT_BASENAME.RESULT,
    testInfo.project.name
  );
});
