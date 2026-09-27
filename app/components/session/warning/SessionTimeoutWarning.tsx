"use client";

import { useState, useEffect } from "react";
import {
  BUTTON,
  TitleVariant,
  STRING,
  ICON_PATHS,
  ICON_ALTS,
  IMAGE_SIZES,
  SESSION_TIMEOUT_WARNING_MODAL,
} from "@/app/constants";

import Title from "../../title/Title";
import Button from "../../button/Button";
import Icon from "../../icons/icon/Icon";
import Text from "../../text/Text";
import InlineText from "../../text/InlineText";
import { SessionTimeoutWarningProps } from "./SessionTimeoutWarningProps.interface";
import { useSessionData } from "../hooks/useSessionData";
import {
  SESSION_TIMEOUT_WARNING_ACTIONS_CLASS,
  SESSION_TIMEOUT_WARNING_CONTENT_CLASS,
  SESSION_TIMEOUT_WARNING_COUNTDOWN_CLASS,
  SESSION_TIMEOUT_WARNING_DESCRIPTION_CLASS,
  SESSION_TIMEOUT_WARNING_DIALOG_CLASS,
  SESSION_TIMEOUT_WARNING_EXTEND_BUTTON_CLASS,
  SESSION_TIMEOUT_WARNING_ICON_CLASS,
  SESSION_TIMEOUT_WARNING_ICON_WRAPPER_CLASS,
  SESSION_TIMEOUT_WARNING_LOGOUT_BUTTON_CLASS,
  SESSION_TIMEOUT_WARNING_OVERLAY_CLASS,
  SESSION_TIMEOUT_WARNING_TITLE_CLASS,
} from "../styles/SessionTimeoutWarning.styles";

const SessionTimeoutWarning = ({
  isVisible,
  onExtend,
  onLogout,
  remainingSeconds,
}: SessionTimeoutWarningProps) => {
  const {
    title,
    description,
    minute,
    logout,
    keep_session,
  } = useSessionData();

  const [countdown, setCountdown] = useState(
    remainingSeconds
  );

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [isVisible, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      onLogout();
    }
  }, [countdown, onLogout]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={SESSION_TIMEOUT_WARNING_OVERLAY_CLASS}
      data-modal={SESSION_TIMEOUT_WARNING_MODAL.ID}
    >
      <div className={SESSION_TIMEOUT_WARNING_DIALOG_CLASS}>
        <div
          className={SESSION_TIMEOUT_WARNING_CONTENT_CLASS}
        >
          <div
            className={
              SESSION_TIMEOUT_WARNING_ICON_WRAPPER_CLASS
            }
          >
            <Icon
              src={ICON_PATHS.WARNING}
              alt={ICON_ALTS.WARNING}
              size={IMAGE_SIZES.ICON.MEDIUM}
              className={SESSION_TIMEOUT_WARNING_ICON_CLASS}
            />
          </div>

          <Title
            variant={TitleVariant.AUXILIAR}
            className={SESSION_TIMEOUT_WARNING_TITLE_CLASS}
          >
            {title}
          </Title>

          <Text
            className={
              SESSION_TIMEOUT_WARNING_DESCRIPTION_CLASS
            }
          >
            {description}
            {STRING.SPACE}
            {STRING.SPACE}
            <InlineText
              className={
                SESSION_TIMEOUT_WARNING_COUNTDOWN_CLASS
              }
            >
              {Math.floor(countdown / 60)}:
              {(countdown % 60)
                .toString()
                .padStart(2, STRING.ZERO)}
            </InlineText>
            {STRING.SPACE}
            {minute}
          </Text>

          <div
            className={
              SESSION_TIMEOUT_WARNING_ACTIONS_CLASS
            }
          >
            <Button
              variant={BUTTON.PRIMARY}
              onClick={onLogout}
              className={
                SESSION_TIMEOUT_WARNING_LOGOUT_BUTTON_CLASS
              }
            >
              {logout}
            </Button>

            <Button
              variant={BUTTON.SECONDARY}
              onClick={onExtend}
              className={
                SESSION_TIMEOUT_WARNING_EXTEND_BUTTON_CLASS
              }
            >
              {keep_session}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning;
