import { cookies } from "next/headers";
import {
  PASSWORD_RECOVERY_GRANT,
  PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS,
} from "@/app/constants";

export const storePasswordRecoveryGrant = async (
  grant: string
): Promise<void> => {
  (await cookies()).set(
    PASSWORD_RECOVERY_GRANT.COOKIE_NAME,
    grant,
    PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS
  );
};
