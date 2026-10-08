import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import type { FirstSignInWorker } from "../models/FirstSignInWorker.interface";
import { SIGNED_IN_USER_ID } from "./recordSignIn.constants";

export const FIRST_SIGN_IN_WORKER: FirstSignInWorker = {
  id: SIGNED_IN_USER_ID,
  username: DEFAULT_SIGN_IN_CREDENTIALS.username,
};

export const TEMPORARY_PASSWORD =
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.currentPassword;

export const PADDED_TEMPORARY_PASSWORD = ` ${TEMPORARY_PASSWORD} `;
