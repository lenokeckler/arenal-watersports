import { Link, MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import { LOGIN_RECOVERY_OFFER_LINK_CLASS } from "../styles/LoginForm.styles";

const LoginRecoveryOffer = (): React.JSX.Element => (
  <Link
    href={PATHS.ACCESS.RECOVERY}
    className={LOGIN_RECOVERY_OFFER_LINK_CLASS}
  >
    <MaterialIcon name={MATERIAL_ICON_NAME.LOCK_RESET} />
    {LOGIN_FORM_COPY.RECOVER_PASSWORD}
  </Link>
);

export default LoginRecoveryOffer;
