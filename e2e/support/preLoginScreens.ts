import { PATHS } from "@/app/constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import type { PreLoginScreen } from "./models/PreLoginScreen.interface";

export const STATELESS_PRE_LOGIN_SCREENS: readonly PreLoginScreen[] =
  [
    {
      route: PATHS.ACCESS.LOGIN,
      open: (page) => createLoginPage(page).goTo(),
      getReadyMarker: (page) =>
        createLoginPage(page).getHeading(),
    },
    {
      route: PATHS.ACCESS.RECOVERY,
      open: (page) =>
        createPasswordRecoveryRequestPage(page).goTo(),
      getReadyMarker: (page) =>
        createPasswordRecoveryRequestPage(
          page
        ).getHeading(),
    },
    {
      route: PATHS.ACCESS.RECOVERY_RESET,
      open: (page) =>
        createPasswordRecoveryResetPage(page).goTo(),
      getReadyMarker: (page) =>
        createPasswordRecoveryResetPage(page).getHeading(),
    },
  ];

export const PRE_LOGIN_ROUTES: readonly string[] = [
  ...STATELESS_PRE_LOGIN_SCREENS.map(
    (screen) => screen.route
  ),
  PATHS.ACCESS.FIRST_SIGN_IN,
  PATHS.ACCESS.RECOVERY_PASSWORD,
];
