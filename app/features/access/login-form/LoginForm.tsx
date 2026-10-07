import { resolveSignInNotice } from "@/app/utils/sign-in/resolveSignInNotice";
import LoginFormView from "./LoginFormView";
import type { LoginFormProps } from "./models/LoginFormProps.interface";

const LoginForm = ({
  reason,
}: LoginFormProps): React.JSX.Element => (
  <LoginFormView notice={resolveSignInNotice(reason)} />
);

export default LoginForm;
