import { Link } from "@/app/components";
import { PATHS } from "@/app/constants";
import { PASSWORD_RECOVERY_NEW_PASSWORD_COPY } from "../constants/PasswordRecoveryNewPasswordCopy.constants";
import { PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS } from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryAnotherPinLink =
  (): React.JSX.Element => (
    <Link
      href={PATHS.ACCESS.RECOVERY}
      className={PASSWORD_RECOVERY_ANOTHER_PIN_LINK_CLASS}
    >
      {
        PASSWORD_RECOVERY_NEW_PASSWORD_COPY.REQUEST_ANOTHER_PIN
      }
    </Link>
  );

export default PasswordRecoveryAnotherPinLink;
