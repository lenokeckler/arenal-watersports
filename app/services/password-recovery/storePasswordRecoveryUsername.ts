import { cookies } from "next/headers";
import { PASSWORD_RECOVERY_USERNAME_COOKIE } from "@/app/constants";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";

export const storePasswordRecoveryUsername = async (
  username: string
): Promise<void> => {
  (await cookies()).set(
    PASSWORD_RECOVERY_USERNAME_COOKIE.NAME,
    normalizeUsername(username),
    PASSWORD_RECOVERY_USERNAME_COOKIE.OPTIONS
  );
};
