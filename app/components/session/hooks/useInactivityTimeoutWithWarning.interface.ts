export interface UseInactivityTimeoutWithWarningProps {
  timeoutMinutes?: number;
  warningMinutes?: number;
  onTimeout?: () => void;
  redirectPath?: string;
}

export interface InactivityTimeoutWithWarning {
  showWarning: boolean;
  warningCountdown: number;
  handleExtendSession: () => void;
  handleLogout: () => Promise<void>;
  refreshTimeout: () => void;
}
