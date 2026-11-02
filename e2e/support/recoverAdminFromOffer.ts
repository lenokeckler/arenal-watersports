import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";
import type { SeededAdmin } from "./models/SeededAdmin.interface";
import { expectSingleMailTo } from "./expectSingleMailTo";
import { readRecoveryPin } from "./readRecoveryPin";
import { resetPasswordWithPin } from "./resetPasswordWithPin";
import { submitRecoveryRequest } from "./submitRecoveryRequest";
import { submitRightPasswordAtLimit } from "./submitRightPasswordAtLimit";

export const recoverAdminFromOffer = async (
  page: Page,
  admin: SeededAdmin,
  newPassword: string
): Promise<void> => {
  await submitRightPasswordAtLimit(page, admin.id);
  await createLoginPage(page)
    .getRecoveryOfferLink()
    .click();
  await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
  await submitRecoveryRequest(
    page,
    E2E_LOGIN_ACCOUNT.USERNAME
  );
  await expectSingleMailTo(admin.personalEmail);
  await resetPasswordWithPin(
    page,
    await readRecoveryPin(admin.personalEmail),
    newPassword
  );
};
