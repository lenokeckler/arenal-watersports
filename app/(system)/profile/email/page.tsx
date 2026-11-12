import type { Metadata } from "next";
import { PERSONAL_EMAIL_FORM_METADATA } from "@/app/features/access/personal-email-form/constants/PersonalEmailFormMetadata.constants";
import PersonalEmailForm from "@/app/features/access/personal-email-form/PersonalEmailForm";

export const metadata: Metadata =
  PERSONAL_EMAIL_FORM_METADATA;

const ProfileEmailPage = (): React.JSX.Element => (
  <PersonalEmailForm />
);

export default ProfileEmailPage;
