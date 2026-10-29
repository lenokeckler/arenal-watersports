export interface SessionTimeoutWarningProps {
  isVisible: boolean;
  onExtend: () => void;
  onLogout: () => void;
  remainingSeconds: number;
}
