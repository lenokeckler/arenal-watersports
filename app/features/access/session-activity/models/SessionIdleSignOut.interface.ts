import type { SessionIdleSignOutPhase } from "./SessionIdleSignOutPhase.type";

export interface SessionIdleSignOut {
  phase: SessionIdleSignOutPhase;
  signOut: () => Promise<void>;
}
