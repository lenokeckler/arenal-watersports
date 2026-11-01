import { cookies } from "next/headers";
import {
  PASSWORD_RECOVERY_GRANT,
  PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS,
} from "@/app/constants";

export const forgetPasswordRecoveryGrant =
  async (): Promise<void> => {
    (await cookies()).delete({
      name: PASSWORD_RECOVERY_GRANT.COOKIE_NAME,
      path: PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS.path,
    });
  };
