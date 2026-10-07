import type { Metadata } from "next";
import { SIGN_IN_NOTICE_QUERY_PARAM } from "@/app/constants";
import LoginForm from "@/app/features/access/login-form/LoginForm";
import { LOGIN_FORM_METADATA } from "@/app/features/access/login-form/constants/LoginFormMetadata.constants";
import { resolveSignInNotice } from "@/app/utils/sign-in/resolveSignInNotice";

export const metadata: Metadata = LOGIN_FORM_METADATA;

const LoginPage = async ({
  searchParams,
}: PageProps<"/access/login">): Promise<React.JSX.Element> => {
  const params = await searchParams;

  return (
    <LoginForm
      notice={resolveSignInNotice(
        params[SIGN_IN_NOTICE_QUERY_PARAM]
      )}
    />
  );
};

export default LoginPage;
