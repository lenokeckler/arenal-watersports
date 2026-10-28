import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PASSWORD_RECOVERY_NEW_PASSWORD_COPY } from "../constants/PasswordRecoveryNewPasswordCopy.constants";
import type { PasswordRecoveryResetSubmitProps } from "../models/PasswordRecoveryResetSubmitProps.interface";

const PasswordRecoveryNewPasswordSubmit = ({
  error,
  isPending,
}: PasswordRecoveryResetSubmitProps): React.JSX.Element => (
  <>
    <FormErrorBanner message={error} />
    <FormSubmitButton
      icon={MATERIAL_ICON_NAME.LOCK_RESET}
      isPending={isPending}
      label={PASSWORD_RECOVERY_NEW_PASSWORD_COPY.SUBMIT}
      pendingLabel={
        PASSWORD_RECOVERY_NEW_PASSWORD_COPY.SUBMITTING
      }
    />
  </>
);

export default PasswordRecoveryNewPasswordSubmit;
