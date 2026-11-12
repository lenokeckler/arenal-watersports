import type { Metadata } from "next";
import ExternalGuideRegistration from "@/app/features/reservations/external-guide-registration/ExternalGuideRegistration";
import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "@/app/features/reservations/external-guide-registration/constants/ExternalGuideRegistrationCopy.constants";

export const metadata: Metadata = {
  title: EXTERNAL_GUIDE_REGISTRATION_COPY.HEADING,
};

const NewExternalGuidePage = (): React.JSX.Element => (
  <ExternalGuideRegistration />
);

export default NewExternalGuidePage;
