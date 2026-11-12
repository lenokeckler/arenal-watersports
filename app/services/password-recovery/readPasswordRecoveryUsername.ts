import { cookies } from "next/headers";
import { PASSWORD_RECOVERY_USERNAME_COOKIE } from "@/app/constants";

export const readPasswordRecoveryUsername =
  async (): Promise<string | undefined> =>
    (await cookies()).get(
      PASSWORD_RECOVERY_USERNAME_COOKIE.NAME
    )?.value;
