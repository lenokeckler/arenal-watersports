import type { Metadata } from "next";
import { PASSWORD_RECOVERY_USERNAME_QUERY_PARAM } from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_METADATA } from "@/app/features/access/password-recovery-form/constants/PasswordRecoveryResetMetadata.constants";
import PasswordRecoveryResetForm from "@/app/features/access/password-recovery-form/PasswordRecoveryResetForm";
import { resolvePasswordRecoveryPrefill } from "@/app/features/access/password-recovery-form/utils/resolvePasswordRecoveryPrefill";

export const metadata: Metadata =
  PASSWORD_RECOVERY_RESET_METADATA;

const PasswordRecoveryResetPage = async ({
  searchParams,
}: PageProps<"/access/recovery/reset">): Promise<React.JSX.Element> => {
  const query = await searchParams;

  return (
    <PasswordRecoveryResetForm
      initialUsername={resolvePasswordRecoveryPrefill(
        query[PASSWORD_RECOVERY_USERNAME_QUERY_PARAM]
      )}
    />
  );
};

export default PasswordRecoveryResetPage;
