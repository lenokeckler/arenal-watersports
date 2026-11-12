import BackLink from "@/app/components/back-link/BackLink";
import { PATHS } from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";

const PasswordRecoveryBackLink = (): React.JSX.Element => (
  <BackLink
    href={PATHS.ACCESS.LOGIN}
    label={PASSWORD_RECOVERY_REQUEST_COPY.BACK}
  />
);

export default PasswordRecoveryBackLink;
