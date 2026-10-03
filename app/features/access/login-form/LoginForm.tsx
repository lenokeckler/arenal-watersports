import AccessScreenHeader from "@/app/features/access/access-screen-shell/AccessScreenHeader";
import AccessScreenShell from "@/app/features/access/access-screen-shell/AccessScreenShell";
import { ACCESS_SCREEN_TITLE_ID } from "@/app/features/access/access-screen-shell/constants/AccessScreen.constants";
import LoginFormView from "./LoginFormView";

const LoginForm = (): React.JSX.Element => (
  <AccessScreenShell titleId={ACCESS_SCREEN_TITLE_ID}>
    <AccessScreenHeader />
    <LoginFormView />
  </AccessScreenShell>
);

export default LoginForm;
