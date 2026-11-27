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
import { SESSION_CONTROLS_COPY } from "./constants/SessionControlsCopy.constants";
import { useLogoutViewModel } from "./hooks/useLogoutViewModel";
import { useThemeViewModel } from "./hooks/useThemeViewModel";
import {
  SESSION_CONTROLS_CLASS,
  SESSION_LOGOUT_SLOT_CLASS,
  SESSION_PREFERENCES_LABEL_CLASS,
  SESSION_THEME_GROUP_CLASS,
  SESSION_THEME_OPTION_CLASS,
} from "./styles/SessionControls.styles";

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
        {SESSION_CONTROLS_COPY.PREFERENCES}
      </Text>
      <div className={SESSION_THEME_GROUP_CLASS}>
        {Object.values(THEME).map((option) => (
          <Button
            key={option}
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            aria-pressed={theme === option}
            className={
              SESSION_THEME_OPTION_CLASS[
                theme === option ? "selected" : "idle"
              ]
            }
            onClick={() => {
              if (theme !== option) {
                handleToggle();
              }
            }}
          >
            {SESSION_CONTROLS_COPY.THEMES[option]}
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
