import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import { PASSWORD_RECOVERY_SENT_NOTICE_CLASS } from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryResetNotice =
  (): React.JSX.Element => (
    <Text
      role={ARIA_ROLE.STATUS}
      className={PASSWORD_RECOVERY_SENT_NOTICE_CLASS}
    >
      {PASSWORD_RECOVERY_RESET_COPY.CONFIRMATION}
    </Text>
  );

export default PasswordRecoveryResetNotice;
