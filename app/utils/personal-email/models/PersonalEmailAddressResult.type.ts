import type { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";

export type PersonalEmailAddressResult =
  | { address: string; ok: true }
  | {
      code:
        | typeof PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID
        | typeof PERSONAL_EMAIL_ERROR_CODE.EMAIL_REQUIRED
        | typeof PERSONAL_EMAIL_ERROR_CODE.EMAIL_TOO_LONG;
      ok: false;
    };
