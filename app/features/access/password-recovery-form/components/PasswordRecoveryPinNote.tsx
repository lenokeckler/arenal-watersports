import { Link, Text } from "@/app/components";
import { FORM_GROUP_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { PATHS } from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS,
  PASSWORD_RECOVERY_HINT_CLASS,
} from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryPinNote = (): React.JSX.Element => (
  <div className={FORM_GROUP_CLASS}>
    <Text className={PASSWORD_RECOVERY_HINT_CLASS}>
      {PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_NOTE}
    </Text>
    <Link
      href={PATHS.ACCESS.RECOVERY}
      className={PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS}
    >
      {PASSWORD_RECOVERY_RESET_COPY.REQUEST_ANOTHER_PIN}
    </Link>
  </div>
);

export default PasswordRecoveryPinNote;
