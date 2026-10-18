import { Button, InlineText } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { resolveFormSubmitIconClassName } from "@/app/components/form-submit-button/styles/FormSubmitButton.styles";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { BUTTON_TYPES } from "@/app/constants";
import { LOGOUT_BUTTON_ICON } from "../constants/LogoutButtonIcon.constants";
import { LOGOUT_BUTTON_LABEL } from "../constants/LogoutButtonLabel.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import type { LogoutButtonProps } from "../models/LogoutButtonProps.interface";
import { resolveLogoutButtonClassName } from "../styles/LogoutButton.styles";

const LogoutButton = ({
  phase,
  onPress,
}: LogoutButtonProps): React.JSX.Element => {
  const isPending = phase === LOGOUT_PHASE.PENDING;

  return (
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.BASE}
      aria-disabled={isPending}
      className={resolveLogoutButtonClassName(phase)}
      onClick={onPress}
    >
      <InlineText>{LOGOUT_BUTTON_LABEL[phase]}</InlineText>
      <MaterialIcon
        name={LOGOUT_BUTTON_ICON[phase]}
        className={resolveFormSubmitIconClassName(
          isPending
        )}
      />
    </Button>
  );
};

export default LogoutButton;
