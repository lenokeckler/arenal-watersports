import {
  Button,
  InlineText,
  MaterialIcon,
} from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import { LOGOUT_BUTTON_ICON } from "../constants/LogoutButtonIcon.constants";
import { LOGOUT_BUTTON_LABEL } from "../constants/LogoutButtonLabel.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import type { LogoutButtonProps } from "../models/LogoutButtonProps.interface";
import {
  resolveLogoutButtonClassName,
  resolveLogoutIconClassName,
} from "../styles/LogoutButton.styles";

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
        className={resolveLogoutIconClassName(phase)}
      />
    </Button>
  );
};

export default LogoutButton;
