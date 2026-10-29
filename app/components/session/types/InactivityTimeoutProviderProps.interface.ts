import { ReactNode } from "react";

export interface InactivityTimeoutProviderProps {
  children: ReactNode;
  timeoutMinutes?: number;
  warningMinutes?: number;
  redirectPath?: string;
}
