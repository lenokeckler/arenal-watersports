import BackLink from "@/app/components/back-link/BackLink";
import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import { FORM_STACK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  PATHS,
  WORKER_REGISTRATION_FIELD,
} from "@/app/constants";
import { WORKER_REGISTRATION_COPY } from "../constants/WorkerRegistrationCopy.constants";
import { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";
import { useWorkerRegistrationViewModel } from "../hooks/useWorkerRegistrationViewModel";
import type { WorkerRegistrationFormProps } from "../models/WorkerRegistrationFormProps.interface";
import WorkerRegisteredResult from "./WorkerRegisteredResult";
import WorkerRegistrationFields from "./WorkerRegistrationFields";

const WorkerRegistrationForm = ({
  action,
  onRegisterAnother,
}: WorkerRegistrationFormProps): React.JSX.Element => {
  const { formAction, state, ...fields } =
    useWorkerRegistrationViewModel(action);

  if (
    state.status === WORKER_REGISTRATION_STATUS.REGISTERED
  ) {
    return (
      <WorkerRegisteredResult
        registered={state.registered}
        onRegisterAnother={onRegisterAnother}
      />
    );
  }

  return (
    <>
      <FormErrorBanner
        message={
          fields.errors[WORKER_REGISTRATION_FIELD.FORM]
        }
      />
      <form
        noValidate
        action={formAction}
        className={FORM_STACK_CLASS}
      >
        <WorkerRegistrationFields {...fields} />
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.PERSON_ADD}
          isPending={fields.isPending}
          label={WORKER_REGISTRATION_COPY.SUBMIT}
          pendingLabel={WORKER_REGISTRATION_COPY.SUBMITTING}
        />
        <BackLink
          href={PATHS.HOME}
          label={WORKER_REGISTRATION_COPY.BACK}
        />
      </form>
    </>
  );
};

export default WorkerRegistrationForm;
