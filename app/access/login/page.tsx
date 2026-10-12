import type { Metadata } from "next";
import LoginForm from "@/app/features/access/login-form/LoginForm";
import { LOGIN_FORM_METADATA } from "@/app/features/access/login-form/constants/LoginFormMetadata.constants";

export const metadata: Metadata = LOGIN_FORM_METADATA;

const LoginPage = (): React.JSX.Element => <LoginForm />;

export default LoginPage;
