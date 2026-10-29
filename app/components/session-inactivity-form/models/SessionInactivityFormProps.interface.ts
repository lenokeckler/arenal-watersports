import { ReactNode } from "react";

export interface SessionInactivityFormProps {
  children: ReactNode;
  showWarningEnabled: boolean;
  refreshOnApiCall: boolean;
}
