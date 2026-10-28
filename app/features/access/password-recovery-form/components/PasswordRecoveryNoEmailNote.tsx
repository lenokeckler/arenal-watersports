import { Text } from "@/app/components";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { FORM_HINT_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";

const PasswordRecoveryNoEmailNote =
  (): React.JSX.Element => (
    <Text className={FORM_HINT_CLASS}>
      {PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE}
    </Text>
  );

export default PasswordRecoveryNoEmailNote;
