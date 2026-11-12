import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { isExternalGuideRegistrarSignedIn } from "@/app/services/external-guide-registration";
import { submitExternalGuideRegistration } from "./actions/submitExternalGuideRegistration";
import ExternalGuideRegistrationView from "./ExternalGuideRegistrationView";

const ExternalGuideRegistration =
  async (): Promise<React.JSX.Element> => {
    if (!(await isExternalGuideRegistrarSignedIn())) {
      redirect(PATHS.RESERVATIONS.CALENDAR);
    }

    return (
      <ExternalGuideRegistrationView
        action={submitExternalGuideRegistration}
      />
    );
  };

export default ExternalGuideRegistration;
