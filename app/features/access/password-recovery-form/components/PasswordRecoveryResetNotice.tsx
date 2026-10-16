import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";

const PasswordRecoveryResetNotice =
  (): React.JSX.Element => (
    <FormSuccessNotice
      message={PASSWORD_RECOVERY_RESET_COPY.CONFIRMATION}
    />
  );

export default PasswordRecoveryResetNotice;
