import { cookies } from "next/headers";
import { PASSWORD_RECOVERY_GRANT } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const readPasswordRecoveryGrant = async (): Promise<
  NullableRef<string>
> => {
  const grant = (await cookies()).get(
    PASSWORD_RECOVERY_GRANT.COOKIE_NAME
  )?.value;

  return grant !== undefined &&
    PASSWORD_RECOVERY_GRANT.PATTERN.test(grant)
    ? grant
    : null;
};
