import type { Metadata } from "next";
import { PASSWORD_RECOVERY_NEW_PASSWORD_METADATA } from "@/app/features/access/password-recovery-form/constants/PasswordRecoveryNewPasswordMetadata.constants";
import PasswordRecoveryNewPasswordForm from "@/app/features/access/password-recovery-form/PasswordRecoveryNewPasswordForm";
import { requireOpenPasswordRecoveryGrant } from "@/app/features/access/password-recovery-form/utils/requireOpenPasswordRecoveryGrant";

export const metadata: Metadata =
  PASSWORD_RECOVERY_NEW_PASSWORD_METADATA;

const PasswordRecoveryNewPasswordPage =
  async (): Promise<React.JSX.Element> => {
    await requireOpenPasswordRecoveryGrant();

    return <PasswordRecoveryNewPasswordForm />;
  };

export default PasswordRecoveryNewPasswordPage;
