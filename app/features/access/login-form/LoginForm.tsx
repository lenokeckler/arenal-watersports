import { resolveSignInNotice } from "@/app/utils/sign-in/resolveSignInNotice";
import LoginFormView from "./LoginFormView";
import type { LoginFormProps } from "./models/LoginFormProps.interface";
import { resolveLoginNoticeMessage } from "./utils/resolveLoginNoticeMessage";

const LoginForm = ({
  notice,
  reason,
}: LoginFormProps): React.JSX.Element => (
  <LoginFormView
    notice={resolveSignInNotice(reason)}
    noticeMessage={resolveLoginNoticeMessage(notice)}
  />
);

export default LoginForm;
