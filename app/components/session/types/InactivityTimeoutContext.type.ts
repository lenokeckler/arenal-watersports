export interface InactivityTimeoutContextType {
  showWarning: boolean;
  warningCountdown: number;
  handleExtendSession: () => void;
  handleLogout: () => void;
  refreshTimeout: () => void;
}
