import type { Metadata } from "next";
import { PASSWORD_RECOVERY_RESET_METADATA } from "@/app/features/access/password-recovery-form/constants/PasswordRecoveryResetMetadata.constants";
import PasswordRecoveryResetForm from "@/app/features/access/password-recovery-form/PasswordRecoveryResetForm";
import { resolvePasswordRecoveryPrefill } from "@/app/features/access/password-recovery-form/utils/resolvePasswordRecoveryPrefill";
import { readPasswordRecoveryUsername } from "@/app/services/password-recovery";

export const metadata: Metadata =
  PASSWORD_RECOVERY_RESET_METADATA;

const PasswordRecoveryResetPage =
  async (): Promise<React.JSX.Element> => (
    <PasswordRecoveryResetForm
      initialUsername={resolvePasswordRecoveryPrefill(
        await readPasswordRecoveryUsername()
      )}
    />
  );

export default PasswordRecoveryResetPage;
