import { Link, Text } from "@/app/components";
import { FORM_HINT_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { PATHS } from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS,
  PASSWORD_RECOVERY_NOT_RECEIVED_CARD_CLASS,
  PASSWORD_RECOVERY_NOT_RECEIVED_TITLE_CLASS,
} from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryPinNote = (): React.JSX.Element => (
  <div
    className={PASSWORD_RECOVERY_NOT_RECEIVED_CARD_CLASS}
  >
    <Text
      className={PASSWORD_RECOVERY_NOT_RECEIVED_TITLE_CLASS}
    >
      {PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_TITLE}
    </Text>
    <Text className={FORM_HINT_CLASS}>
      {PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_NOTE}
    </Text>
    <Text className={FORM_HINT_CLASS}>
      {PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE}
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
