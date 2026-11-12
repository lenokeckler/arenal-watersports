import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { FORM_SUBMIT_BUTTON_TONE } from "@/app/components/form-submit-button/constants/FormSubmitButtonTone.constants";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  PERSONAL_EMAIL_INTENT,
  PERSONAL_EMAIL_INTENT_FIELD,
} from "@/app/constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import type { PersonalEmailRemoveButtonProps } from "../models/PersonalEmailRemoveButtonProps.interface";

const PersonalEmailRemoveButton = ({
  isPending,
  pendingIntent,
}: PersonalEmailRemoveButtonProps): React.JSX.Element => (
  <FormSubmitButton
    icon={MATERIAL_ICON_NAME.DELETE}
    isPending={isPending}
    label={PERSONAL_EMAIL_FORM_COPY.REMOVE}
    name={PERSONAL_EMAIL_INTENT_FIELD}
    pendingLabel={PERSONAL_EMAIL_FORM_COPY.REMOVING}
    showsProgress={
      pendingIntent === PERSONAL_EMAIL_INTENT.REMOVE
    }
    tone={FORM_SUBMIT_BUTTON_TONE.DANGER_OUTLINE}
    value={PERSONAL_EMAIL_INTENT.REMOVE}
  />
);

export default PersonalEmailRemoveButton;
