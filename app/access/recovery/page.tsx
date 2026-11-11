import type { Metadata } from "next";
import { PASSWORD_RECOVERY_REQUEST_METADATA } from "@/app/features/access/password-recovery-form/constants/PasswordRecoveryRequestMetadata.constants";
import PasswordRecoveryRequestForm from "@/app/features/access/password-recovery-form/PasswordRecoveryRequestForm";

export const metadata: Metadata =
  PASSWORD_RECOVERY_REQUEST_METADATA;

const PasswordRecoveryPage = (): React.JSX.Element => (
  <PasswordRecoveryRequestForm />
);

export default PasswordRecoveryPage;
