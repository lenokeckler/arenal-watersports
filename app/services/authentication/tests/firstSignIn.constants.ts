import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import type { SignedInWorker } from "../models/SignedInWorker.interface";
import { SIGNED_IN_USER_ID } from "./recordSignIn.constants";

export const FIRST_SIGN_IN_WORKER: SignedInWorker = {
  id: SIGNED_IN_USER_ID,
  mustChangePassword: true,
  username: DEFAULT_SIGN_IN_CREDENTIALS.username,
};

export const TEMPORARY_PASSWORD =
  DEFAULT_PASSWORD_CHANGE_INPUT.currentPassword;

export const PADDED_TEMPORARY_PASSWORD = ` ${TEMPORARY_PASSWORD} `;

export const SIGNED_IN_USER_RESULT = {
  data: { user: { id: FIRST_SIGN_IN_WORKER.id } },
  error: null,
};

export const workerRow = (mustChangePassword: boolean) => ({
  data: {
    must_change_password: mustChangePassword,
    username: FIRST_SIGN_IN_WORKER.username,
  },
  error: null,
});

export const ALREADY_CHANGED_WORKER: SignedInWorker = {
  ...FIRST_SIGN_IN_WORKER,
  mustChangePassword: false,
};
