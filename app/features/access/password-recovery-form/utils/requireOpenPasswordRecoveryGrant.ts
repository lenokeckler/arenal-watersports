import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  isPasswordResetGrantOpen,
  readPasswordRecoveryGrant,
} from "@/app/services/password-recovery";

export const requireOpenPasswordRecoveryGrant =
  async (): Promise<void> => {
    const grant = await readPasswordRecoveryGrant();

    if (
      grant === null ||
      !(await isPasswordResetGrantOpen(grant))
    ) {
      redirect(PATHS.ACCESS.RECOVERY);
    }
  };
