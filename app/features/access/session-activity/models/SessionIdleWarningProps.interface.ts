import type { SessionIdleSignOutPhase } from "./SessionIdleSignOutPhase.type";

export interface SessionIdleWarningProps {
  onKeepWorking: () => void;
  onSignOut: () => void;
  secondsLeft: number;
  signOutPhase: SessionIdleSignOutPhase;
}
