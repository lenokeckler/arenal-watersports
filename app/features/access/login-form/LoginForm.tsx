import LoginFormView from "./LoginFormView";
import type { LoginFormProps } from "./models/LoginFormProps.interface";
import { resolveLoginNoticeMessage } from "./utils/resolveLoginNoticeMessage";

const LoginForm = ({
  notice,
}: LoginFormProps): React.JSX.Element => (
  <LoginFormView
    noticeMessage={resolveLoginNoticeMessage(notice)}
  />
);

export default LoginForm;
