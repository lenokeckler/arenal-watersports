"use client";

import { useId } from "react";
import { Button, InlineText, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import { SESSION_ACTIVITY_IGNORE_PROPS } from "../constants/SessionActivity.constants";
import { SESSION_IDLE_SIGN_OUT_PHASE } from "../constants/SessionIdleSignOutPhase.constants";
import { SESSION_IDLE_WARNING_COPY } from "../constants/SessionIdleWarningCopy.constants";
import type { SessionIdleWarningProps } from "../models/SessionIdleWarningProps.interface";
import {
  resolveSessionIdleSignOutClassName,
  SESSION_IDLE_WARNING_ACTIONS_CLASS,
  SESSION_IDLE_WARNING_COUNTDOWN_CLASS,
  SESSION_IDLE_WARNING_DESCRIPTION_CLASS,
  SESSION_IDLE_WARNING_ERROR_CLASS,
  SESSION_IDLE_WARNING_KEEP_WORKING_CLASS,
  SESSION_IDLE_WARNING_OVERLAY_CLASS,
  SESSION_IDLE_WARNING_PANEL_CLASS,
  SESSION_IDLE_WARNING_TITLE_CLASS,
} from "../styles/SessionIdleWarning.styles";
import { formatCountdown } from "../utils/formatCountdown";

const SessionIdleWarning = ({
  onKeepWorking,
  onSignOut,
  secondsLeft,
  signOutPhase,
}: SessionIdleWarningProps): React.JSX.Element => {
  const titleId = useId();
  const descriptionId = useId();
  const isSigningOut =
    signOutPhase === SESSION_IDLE_SIGN_OUT_PHASE.PENDING;

  return (
    <div
      className={SESSION_IDLE_WARNING_OVERLAY_CLASS}
      {...SESSION_ACTIVITY_IGNORE_PROPS}
    >
      <div
        role={ARIA_ROLE.ALERT_DIALOG}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={SESSION_IDLE_WARNING_PANEL_CLASS}
      >
        <Text
          id={titleId}
          className={SESSION_IDLE_WARNING_TITLE_CLASS}
        >
          {SESSION_IDLE_WARNING_COPY.TITLE}
        </Text>
        <Text
          id={descriptionId}
          className={SESSION_IDLE_WARNING_DESCRIPTION_CLASS}
        >
          {SESSION_IDLE_WARNING_COPY.COUNTDOWN_LEAD}
          <InlineText
            className={SESSION_IDLE_WARNING_COUNTDOWN_CLASS}
          >
            {formatCountdown(secondsLeft)}
          </InlineText>
        </Text>
        <div className={SESSION_IDLE_WARNING_ACTIONS_CLASS}>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            autoFocus
            className={
              SESSION_IDLE_WARNING_KEEP_WORKING_CLASS
            }
            onClick={onKeepWorking}
          >
            {SESSION_IDLE_WARNING_COPY.KEEP_WORKING}
          </Button>
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            aria-disabled={isSigningOut}
            className={resolveSessionIdleSignOutClassName(
              isSigningOut
            )}
            onClick={onSignOut}
          >
            {isSigningOut
              ? SESSION_IDLE_WARNING_COPY.SIGNING_OUT
              : SESSION_IDLE_WARNING_COPY.SIGN_OUT}
          </Button>
        </div>
        {signOutPhase ===
          SESSION_IDLE_SIGN_OUT_PHASE.FAILED && (
          <Text
            role={ARIA_ROLE.ALERT}
            className={SESSION_IDLE_WARNING_ERROR_CLASS}
          >
            {SESSION_IDLE_WARNING_COPY.SIGN_OUT_FAILED}
          </Text>
        )}
      </div>
    </div>
  );
};

export default SessionIdleWarning;
