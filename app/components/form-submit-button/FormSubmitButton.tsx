import { Button, InlineText } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { FormSubmitButtonProps } from "./models/FormSubmitButtonProps.interface";
import {
  resolveFormSubmitClassName,
  resolveFormSubmitIconClassName,
} from "./styles/FormSubmitButton.styles";

const FormSubmitButton = ({
  icon,
  isPending,
  label,
  pendingLabel,
}: FormSubmitButtonProps): React.JSX.Element => (
  <Button
    type={BUTTON_TYPES.SUBMIT}
    variant={BUTTON.BASE}
    aria-disabled={isPending}
    className={resolveFormSubmitClassName(isPending)}
  >
    <InlineText>
      {isPending ? pendingLabel : label}
    </InlineText>
    <MaterialIcon
      name={
        isPending
          ? MATERIAL_ICON_NAME.PROGRESS_ACTIVITY
          : icon
      }
      className={resolveFormSubmitIconClassName(isPending)}
    />
  </Button>
);

export default FormSubmitButton;
