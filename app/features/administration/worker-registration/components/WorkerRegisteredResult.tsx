import { Button } from "@/app/components";
import BackLink from "@/app/components/back-link/BackLink";
import { BUTTON } from "@/app/components/button/constants";
import FormSuccessNotice from "@/app/components/form-success-notice/FormSuccessNotice";
import TemporaryPasswordBox from "@/app/components/temporary-password-box/TemporaryPasswordBox";
import { BUTTON_TYPES, PATHS } from "@/app/constants";
import { WORKER_REGISTRATION_COPY } from "../constants/WorkerRegistrationCopy.constants";

import type { WorkerRegisteredResultProps } from "../models/WorkerRegisteredResultProps.interface";
import {
  REGISTER_ANOTHER_BUTTON_CLASS,
  WORKER_REGISTERED_RESULT_CLASS,
} from "../styles/WorkerRegistration.styles";

const WorkerRegisteredResult = ({
  onRegisterAnother,
  registered,
}: WorkerRegisteredResultProps): React.JSX.Element => (
  <div className={WORKER_REGISTERED_RESULT_CLASS}>
    <FormSuccessNotice
      message={WORKER_REGISTRATION_COPY.REGISTERED_NOTICE(
        registered.fullName,
        registered.username
      )}
    />
    <TemporaryPasswordBox
      temporaryPassword={registered.temporaryPassword}
    />
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.BASE}
      className={REGISTER_ANOTHER_BUTTON_CLASS}
      onClick={onRegisterAnother}
    >
      {WORKER_REGISTRATION_COPY.REGISTER_ANOTHER}
    </Button>
    <BackLink
      href={PATHS.HOME}
      label={WORKER_REGISTRATION_COPY.BACK}
    />
  </div>
);

export default WorkerRegisteredResult;
