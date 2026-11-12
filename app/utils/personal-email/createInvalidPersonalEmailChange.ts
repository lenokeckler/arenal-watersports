import type { PersonalEmailErrorCode } from "@/app/constants";
import { createPersonalEmailError } from "./createPersonalEmailError";
import type { PersonalEmailValidation } from "./models/PersonalEmailValidation.type";

export const createInvalidPersonalEmailChange = (
  code: PersonalEmailErrorCode
): PersonalEmailValidation => ({
  error: createPersonalEmailError(code),
  ok: false,
});
