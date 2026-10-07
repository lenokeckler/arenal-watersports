import LoginFormView from "./LoginFormView";
import type { LoginFormOptions } from "./models/LoginFormOptions.interface";

const LoginForm = ({
  notice,
}: LoginFormOptions): React.JSX.Element => (
  <LoginFormView notice={notice} />
);

export default LoginForm;
