import {
  Button,
  InlineText,
  MaterialIcon,
} from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES, THEME } from "@/app/constants";
import {
  THEME_TOGGLE_ACCESSIBLE_COPY,
  THEME_TOGGLE_COPY,
} from "../constants/ThemeToggleCopy.constants";
import { THEME_TOGGLE_ICON } from "../constants/ThemeToggleIcon.constants";
import type { ThemeToggleButtonProps } from "../models/ThemeToggleButtonProps.interface";
import { THEME_TOGGLE_BUTTON_CLASS } from "../styles/ThemeToggleButton.styles";

const ThemeToggleButton = ({
  onPress,
  theme,
}: ThemeToggleButtonProps): React.JSX.Element => (
  <Button
    type={BUTTON_TYPES.BUTTON}
    variant={BUTTON.BASE}
    aria-label={THEME_TOGGLE_ACCESSIBLE_COPY[theme]}
    aria-pressed={theme === THEME.LIGHT}
    className={THEME_TOGGLE_BUTTON_CLASS}
    onClick={onPress}
  >
    <InlineText>{THEME_TOGGLE_COPY[theme]}</InlineText>
    <MaterialIcon name={THEME_TOGGLE_ICON[theme]} />
  </Button>
);

export default ThemeToggleButton;
