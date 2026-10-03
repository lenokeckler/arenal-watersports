import type { NullableRef } from "@/app/types";
import { LOGIN_FOCUS_ORDER } from "../constants/LoginFormFocus.constants";
import type { LoginFocusField } from "../models/LoginFocusField.type";
import type { SignInFieldErrors } from "../models/SignInFieldErrors.type";

export const resolveFirstNewFieldError = (
  previous: SignInFieldErrors,
  current: SignInFieldErrors
): NullableRef<LoginFocusField> =>
  LOGIN_FOCUS_ORDER.find(
    (field) => !previous[field] && Boolean(current[field])
  ) ?? null;
