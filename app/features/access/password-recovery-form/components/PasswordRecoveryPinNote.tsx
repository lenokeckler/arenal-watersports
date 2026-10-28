import { Link, Text } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { FORM_HINT_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { PATHS } from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS,
  PASSWORD_RECOVERY_NOT_RECEIVED_CLASS,
  PASSWORD_RECOVERY_NOT_RECEIVED_DETAILS_CLASS,
  PASSWORD_RECOVERY_NOT_RECEIVED_HELP_CLASS,
  PASSWORD_RECOVERY_NOT_RECEIVED_ICON_CLASS,
  PASSWORD_RECOVERY_NOT_RECEIVED_SUMMARY_CLASS,
} from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryPinNote = (): React.JSX.Element => (
  <div className={PASSWORD_RECOVERY_NOT_RECEIVED_CLASS}>
    <details
      className={
        PASSWORD_RECOVERY_NOT_RECEIVED_DETAILS_CLASS
      }
    >
      <summary
        className={
          PASSWORD_RECOVERY_NOT_RECEIVED_SUMMARY_CLASS
        }
      >
        <span>
          {PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_TITLE}
        </span>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.EXPAND_MORE}
          className={
            PASSWORD_RECOVERY_NOT_RECEIVED_ICON_CLASS
          }
        />
      </summary>
      <div
        className={
          PASSWORD_RECOVERY_NOT_RECEIVED_HELP_CLASS
        }
      >
        <Text className={FORM_HINT_CLASS}>
          {PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_NOTE}
        </Text>
        <Text className={FORM_HINT_CLASS}>
          {PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE}
        </Text>
      </div>
    </details>
    <Link
      href={PATHS.ACCESS.RECOVERY}
      className={PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS}
    >
      {PASSWORD_RECOVERY_RESET_COPY.REQUEST_ANOTHER_PIN}
    </Link>
  </div>
);

export default PasswordRecoveryPinNote;
