import { Button, InlineText } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { FORM_SUBMIT_BUTTON_TONE } from "./constants/FormSubmitButtonTone.constants";
import type { FormSubmitButtonProps } from "./models/FormSubmitButtonProps.interface";
import {
  resolveFormSubmitClassName,
  resolveFormSubmitIconClassName,
} from "./styles/FormSubmitButton.styles";

const FormSubmitButton = ({
  icon,
  isPending,
  label,
  name,
  pendingLabel,
  showsProgress = true,
  tone = FORM_SUBMIT_BUTTON_TONE.PRIMARY,
  value,
}: FormSubmitButtonProps): React.JSX.Element => {
  const isShowingProgress = isPending && showsProgress;

  return (
    <Button
      type={BUTTON_TYPES.SUBMIT}
      variant={BUTTON.BASE}
      name={name}
      value={value}
      aria-disabled={isPending}
      className={resolveFormSubmitClassName(
        isPending,
        tone
      )}
    >
      <InlineText>
        {isShowingProgress ? pendingLabel : label}
      </InlineText>
      <MaterialIcon
        name={
          isShowingProgress
            ? MATERIAL_ICON_NAME.PROGRESS_ACTIVITY
            : icon
        }
        className={resolveFormSubmitIconClassName(
          isShowingProgress
        )}
      />
    </Button>
  );
};

export default FormSubmitButton;
