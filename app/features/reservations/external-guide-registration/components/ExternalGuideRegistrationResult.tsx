import { Button } from "@/app/components";
import BackLink from "@/app/components/back-link/BackLink";
import { BUTTON } from "@/app/components/button/constants";
import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import TemporaryPasswordBox from "@/app/components/temporary-password-box/TemporaryPasswordBox";
import { BUTTON_TYPES, PATHS } from "@/app/constants";
import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "../constants/ExternalGuideRegistrationCopy.constants";
import type { ExternalGuideRegistrationResultProps } from "../models/ExternalGuideRegistrationResultProps.interface";
import { EXTERNAL_GUIDE_REGISTRATION_RESULT_CLASS } from "../styles/ExternalGuideRegistration.styles";

const ExternalGuideRegistrationResult = ({
  onRegisterAnother,
  registered,
}: ExternalGuideRegistrationResultProps): React.JSX.Element => (
  <div className={EXTERNAL_GUIDE_REGISTRATION_RESULT_CLASS}>
    <FormSuccessNotice
      message={EXTERNAL_GUIDE_REGISTRATION_COPY.REGISTERED(
        registered.fullName,
        registered.nationalId
      )}
    />
    <TemporaryPasswordBox
      temporaryPassword={registered.temporaryPassword}
    />
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.BASE}
      onClick={onRegisterAnother}
    >
      {EXTERNAL_GUIDE_REGISTRATION_COPY.REGISTER_ANOTHER}
    </Button>
    <BackLink
      href={PATHS.RESERVATIONS.CALENDAR}
      label={EXTERNAL_GUIDE_REGISTRATION_COPY.BACK}
    />
  </div>
);

export default ExternalGuideRegistrationResult;
