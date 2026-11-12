"use client";

import { Button, Text } from "@/app/components";
import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import {
  BUTTON,
  BUTTON_TYPES,
  THEME,
} from "@/app/constants";
import LogoutButton from "./components/LogoutButton";
import LogoutStatus from "./components/LogoutStatus";
import { useLogoutViewModel } from "./hooks/useLogoutViewModel";
import { useThemeViewModel } from "./hooks/useThemeViewModel";
import {
  SESSION_CONTROLS_CLASS,
  SESSION_LOGOUT_SLOT_CLASS,
  SESSION_PREFERENCES_LABEL_CLASS,
  SESSION_THEME_GROUP_CLASS,
  SESSION_THEME_OPTION_CLASS,
} from "./styles/SessionControls.styles";

const THEME_OPTIONS = [
  { label: "Oscuro", theme: THEME.DARK },
  { label: "Claro", theme: THEME.LIGHT },
] as const;

const PREFERENCES_LABEL = "Preferencias";

const SessionControls = (): React.JSX.Element => {
  const {
    phase,
    handlePress,
    errorMessage,
    pendingAnnouncement,
  } = useLogoutViewModel();
  const { theme, handleToggle } = useThemeViewModel();

  return (
    <div className={SESSION_CONTROLS_CLASS}>
      <LogoutStatus message={pendingAnnouncement} />
      <Text className={SESSION_PREFERENCES_LABEL_CLASS}>
        {PREFERENCES_LABEL}
      </Text>
      <div className={SESSION_THEME_GROUP_CLASS}>
        {THEME_OPTIONS.map((option) => (
          <Button
            key={option.theme}
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            aria-pressed={theme === option.theme}
            className={
              SESSION_THEME_OPTION_CLASS[
                theme === option.theme ? "selected" : "idle"
              ]
            }
            onClick={() => {
              if (theme !== option.theme) {
                handleToggle();
              }
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <div className={SESSION_LOGOUT_SLOT_CLASS}>
        <LogoutButton
          phase={phase}
          onPress={handlePress}
        />
        <FormErrorBanner message={errorMessage} />
      </div>
    </div>
  );
};

export default SessionControls;
