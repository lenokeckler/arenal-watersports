import { Button, InlineText } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  BUTTON_TYPES,
  PERSONAL_EMAIL_INTENT,
  PERSONAL_EMAIL_INTENT_FIELD,
} from "@/app/constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import type { PersonalEmailRemoveButtonProps } from "../models/PersonalEmailRemoveButtonProps.interface";
import {
  resolvePersonalEmailRemoveClassName,
  resolvePersonalEmailRemoveIconClassName,
} from "../styles/PersonalEmailForm.styles";

const PersonalEmailRemoveButton = ({
  isPending,
  pendingIntent,
}: PersonalEmailRemoveButtonProps): React.JSX.Element => {
  const isShowingProgress =
    pendingIntent === PERSONAL_EMAIL_INTENT.REMOVE;

  return (
    <Button
      type={BUTTON_TYPES.SUBMIT}
      variant={BUTTON.BASE}
      name={PERSONAL_EMAIL_INTENT_FIELD}
      value={PERSONAL_EMAIL_INTENT.REMOVE}
      aria-disabled={isPending}
      className={resolvePersonalEmailRemoveClassName(
        isPending
      )}
    >
      <InlineText>
        {isShowingProgress
          ? PERSONAL_EMAIL_FORM_COPY.REMOVING
          : PERSONAL_EMAIL_FORM_COPY.REMOVE}
      </InlineText>
      <MaterialIcon
        name={
          isShowingProgress
            ? MATERIAL_ICON_NAME.PROGRESS_ACTIVITY
            : MATERIAL_ICON_NAME.DELETE
        }
        className={resolvePersonalEmailRemoveIconClassName(
          isShowingProgress
        )}
      />
    </Button>
  );
};

export default PersonalEmailRemoveButton;
