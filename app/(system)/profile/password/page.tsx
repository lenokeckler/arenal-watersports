import type { Metadata } from "next";
import { PROFILE_PASSWORD_FORM_METADATA } from "@/app/features/access/password-change-form/constants/ProfilePasswordFormMetadata.constants";
import ProfilePasswordForm from "@/app/features/access/password-change-form/ProfilePasswordForm";

export const metadata: Metadata =
  PROFILE_PASSWORD_FORM_METADATA;

const ProfilePasswordPage = (): React.JSX.Element => (
  <ProfilePasswordForm />
);

export default ProfilePasswordPage;
