import BackLink from "@/app/components/back-link/BackLink";
import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import { FORM_STACK_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { EXTERNAL_GUIDE_REGISTRATION_COPY } from "../constants/ExternalGuideRegistrationCopy.constants";
import { EXTERNAL_GUIDE_REGISTRATION_STATUS } from "../constants/ExternalGuideRegistrationForm.constants";
import { useExternalGuideRegistrationViewModel } from "../hooks/useExternalGuideRegistrationViewModel";
import type { ExternalGuideRegistrationFormProps } from "../models/ExternalGuideRegistrationFormProps.interface";
import { resolveExternalGuideRegistrationError } from "../utils/resolveExternalGuideRegistrationError";
import ExternalGuideRegistrationFields from "./ExternalGuideRegistrationFields";
import ExternalGuideRegistrationResult from "./ExternalGuideRegistrationResult";

const ExternalGuideRegistrationForm = ({
  action,
  onRegisterAnother,
}: ExternalGuideRegistrationFormProps): React.JSX.Element => {
  const viewModel =
    useExternalGuideRegistrationViewModel(action);

  if (
    viewModel.state.status ===
    EXTERNAL_GUIDE_REGISTRATION_STATUS.REGISTERED
  ) {
    return (
      <ExternalGuideRegistrationResult
        onRegisterAnother={onRegisterAnother}
        registered={viewModel.state.registered}
      />
    );
  }

  const error =
    viewModel.state.status ===
    EXTERNAL_GUIDE_REGISTRATION_STATUS.REFUSED
      ? resolveExternalGuideRegistrationError(
          viewModel.state.code
        )
      : undefined;

  return (
    <>
      <FormErrorBanner message={error} />
      <form
        action={viewModel.formAction}
        className={FORM_STACK_CLASS}
      >
        <ExternalGuideRegistrationFields
          isPending={viewModel.isPending}
          onChange={viewModel.onChange}
          values={viewModel.values}
        />
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.PERSON_ADD}
          isPending={viewModel.isPending}
          label={EXTERNAL_GUIDE_REGISTRATION_COPY.SUBMIT}
          pendingLabel={
            EXTERNAL_GUIDE_REGISTRATION_COPY.SUBMITTING
          }
        />
        <BackLink
          href={PATHS.RESERVATIONS.CALENDAR}
          label={EXTERNAL_GUIDE_REGISTRATION_COPY.BACK}
        />
      </form>
    </>
  );
};

export default ExternalGuideRegistrationForm;
