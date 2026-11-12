import { expect, test as base } from "@playwright/test";
import { PATHS, SIGN_IN_ERROR_CODE } from "@/app/constants";
import { SIGN_IN_ERROR_COPY } from "@/app/features/access/login-form/constants/SignInErrorCopy.constants";
import { E2E_EXTERNAL_GUIDE } from "../constants/E2eExternalGuideRegistration.constants";
import { createExternalGuideRegistrationPage } from "../pages/ExternalGuideRegistration.page";
import { createLoginPage } from "../pages/Login.page";
import { buildE2eUsername } from "../support/buildE2eUsername";
import { buildExternalGuideExpiryDate } from "../support/buildExternalGuideExpiryDate";
import { createExternalGuideRegistrar } from "../support/createExternalGuideRegistrar";
import { createServiceRoleClient } from "../support/createServiceRoleClient";
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

test("marked reservations worker registers an operations guide who changes the temporary password on first sign-in", async ({
  context,
  nationalId,
  page,
  registrar,
}) => {
  const loginPage = createLoginPage(page);
  const registrationPage =
    createExternalGuideRegistrationPage(page);

  await loginPage.goTo();
  await loginPage.fillUsername(registrar.username);
  await loginPage.fillPassword(registrar.password);
  await loginPage.submit();
  await page.waitForURL(PATHS.HOME);
  await registrationPage.goToCalendar();
  await expect(
    registrationPage.getCalendarLink()
  ).toBeVisible();
  await registrationPage.getCalendarLink().click();

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
  const temporaryPassword = await registrationPage
    .getTemporaryPassword()
    .innerText();
  const serviceClient = createServiceRoleClient();
  const { data, error } = await serviceClient
    .from("workers")
    .select(
      "id,base_role,is_external_guide,national_id,created_by,must_change_password"
    )
    .eq("username", nationalId)
    .single();
  expect(error).toBeNull();
  expect(data).toMatchObject({
    base_role: "operaciones",
    is_external_guide: true,
    national_id: nationalId,
    created_by: registrar.workerId,
    must_change_password: true,
  });
  const { data: guideMark, error: markError } =
    await serviceClient
      .from("worker_marks")
      .select("mark")
      .eq("worker_id", data?.id ?? "")
      .eq("mark", E2E_EXTERNAL_GUIDE.GUIDE_MARK)
      .single();
  expect(markError).toBeNull();
  expect(guideMark?.mark).toBe(
    E2E_EXTERNAL_GUIDE.GUIDE_MARK
  );
  await context.clearCookies();
  await loginPage.goTo();
  await loginPage.fillUsername(nationalId);
  await loginPage.fillPassword(temporaryPassword);
  await loginPage.submit();
  await expect(page).toHaveURL(PATHS.ACCESS.FIRST_SIGN_IN);

  const { error: expiryError } = await serviceClient
    .from("workers")
    .update({ expires_at: E2E_EXTERNAL_GUIDE.EXPIRED_AT })
    .eq("username", nationalId);
  expect(expiryError).toBeNull();
  await context.clearCookies();
  await loginPage.goTo();
  await loginPage.fillUsername(nationalId);
  await loginPage.fillPassword(temporaryPassword);
  await loginPage.submit();
  await expect(loginPage.getFormError()).toContainText(
    SIGN_IN_ERROR_COPY[SIGN_IN_ERROR_CODE.ACCOUNT_EXPIRED]
  );
});

base(
  "worker without the registration mark cannot see or open the option",
  async ({ context, page }) => {
    const registrar =
      await createExternalGuideRegistrar(false);
    try {
      const loginPage = createLoginPage(page);
      const registrationPage =
        createExternalGuideRegistrationPage(page);

      await loginPage.goTo();
      await loginPage.fillUsername(registrar.username);
      await loginPage.fillPassword(registrar.password);
      await loginPage.submit();
      await page.waitForURL(PATHS.HOME);
      await registrationPage.goToCalendar();
      await expect(
        registrationPage.getCalendarLink()
      ).toHaveCount(0);
      await registrationPage.goTo();
      await expect(page).toHaveURL(
        PATHS.RESERVATIONS.CALENDAR
      );
    } finally {
      await context.clearCookies();
      await registrar.remove();
    }
  }
);
