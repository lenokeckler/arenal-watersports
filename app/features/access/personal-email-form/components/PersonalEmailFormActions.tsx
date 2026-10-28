import BackLink from "@/app/components/back-link/BackLink";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  PATHS,
  PERSONAL_EMAIL_INTENT,
  PERSONAL_EMAIL_INTENT_FIELD,
} from "@/app/constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import type { PersonalEmailFormActionsProps } from "../models/PersonalEmailFormActionsProps.interface";
import PersonalEmailRemoveButton from "./PersonalEmailRemoveButton";

const PersonalEmailFormActions = ({
  canRemove,
  isPending,
  pendingIntent,
}: PersonalEmailFormActionsProps): React.JSX.Element => (
  <>
    <FormSubmitButton
      icon={MATERIAL_ICON_NAME.MAIL}
      isPending={isPending}
      label={PERSONAL_EMAIL_FORM_COPY.SUBMIT}
      name={PERSONAL_EMAIL_INTENT_FIELD}
      pendingLabel={PERSONAL_EMAIL_FORM_COPY.SUBMITTING}
      showsProgress={
        pendingIntent === PERSONAL_EMAIL_INTENT.SAVE
      }
      value={PERSONAL_EMAIL_INTENT.SAVE}
    />
    {canRemove && (
      <PersonalEmailRemoveButton
        isPending={isPending}
        pendingIntent={pendingIntent}
      />
    )}
    <BackLink
      href={PATHS.PROFILE.ROOT}
      label={PERSONAL_EMAIL_FORM_COPY.BACK}
    />
  </>
);

export default PersonalEmailFormActions;
