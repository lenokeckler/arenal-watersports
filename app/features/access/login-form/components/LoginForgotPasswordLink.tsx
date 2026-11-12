import { Link } from "@/app/components";
import { FORM_TEXT_LINK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { PATHS } from "@/app/constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import { LOGIN_FORGOT_ROW_CLASS } from "../styles/LoginForm.styles";

const LoginForgotPasswordLink = (): React.JSX.Element => (
  <div className={LOGIN_FORGOT_ROW_CLASS}>
    <Link
      href={PATHS.ACCESS.RECOVERY}
      className={FORM_TEXT_LINK_CLASS}
    >
      {LOGIN_FORM_COPY.FORGOT_PASSWORD}
    </Link>
  </div>
);

export default LoginForgotPasswordLink;
