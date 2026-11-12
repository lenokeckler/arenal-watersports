import type { Metadata } from "next";
import FirstSignInForm from "@/app/features/access/password-change-form/FirstSignInForm";
import { FIRST_SIGN_IN_FORM_METADATA } from "@/app/features/access/password-change-form/constants/FirstSignInFormMetadata.constants";

export const metadata: Metadata =
  FIRST_SIGN_IN_FORM_METADATA;

const FirstSignInPage = (): React.JSX.Element => (
  <FirstSignInForm />
);

export default FirstSignInPage;
