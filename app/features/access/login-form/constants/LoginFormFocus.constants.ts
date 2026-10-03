import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import type { LoginFocusField } from "../models/LoginFocusField.type";

export const LOGIN_FOCUS_ORDER: readonly LoginFocusField[] =
  [SIGN_IN_FIELD.USERNAME, SIGN_IN_FIELD.PASSWORD];
