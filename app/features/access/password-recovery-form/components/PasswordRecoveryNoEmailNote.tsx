import { Text } from "@/app/components";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_HINT_CLASS } from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryNoEmailNote =
  (): React.JSX.Element => (
    <Text className={PASSWORD_RECOVERY_HINT_CLASS}>
      {PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE}
    </Text>
  );

export default PasswordRecoveryNoEmailNote;
