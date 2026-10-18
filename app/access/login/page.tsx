import type { Metadata } from "next";
import { LOGIN_NOTICE_QUERY_PARAM } from "@/app/constants";
import LoginForm from "@/app/features/access/login-form/LoginForm";
import { LOGIN_FORM_METADATA } from "@/app/features/access/login-form/constants/LoginFormMetadata.constants";

export const metadata: Metadata = LOGIN_FORM_METADATA;

const LoginPage = async ({
  searchParams,
}: PageProps<"/access/login">): Promise<React.JSX.Element> => {
  const query = await searchParams;

  return (
    <LoginForm notice={query[LOGIN_NOTICE_QUERY_PARAM]} />
  );
};

export default LoginPage;
