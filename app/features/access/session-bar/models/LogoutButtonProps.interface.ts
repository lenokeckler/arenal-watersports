import type { LogoutPhase } from "./LogoutPhase.type";

export interface LogoutButtonProps {
  phase: LogoutPhase;
  onPress: () => void;
}
