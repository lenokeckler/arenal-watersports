export interface SessionInactivityFormViewModel {
  hasActiveUser: boolean;
  showWarning: boolean;
  warningCountdown: number;
  handleExtendSession: () => void;
  handleLogout: () => void;
}
