import { LOGOUT_COPY } from "../constants/LogoutCopy.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import type { SessionBarViewProps } from "../models/SessionBarViewProps.type";

export const ANNOUNCEMENT = LOGOUT_COPY.PENDING;
export const LOGOUT_ROUTE_FILE_NAME = "route.ts";
export const LOGOUT_PATH_SEGMENT =
  /logout|signout|sign-out/i;
export const APP_DIRECTORY = "app";

export const IDLE_PROPS: SessionBarViewProps = {
  phase: LOGOUT_PHASE.IDLE,
  handlePress: () => undefined,
  errorMessage: null,
  pendingAnnouncement: "",
};

export const NON_FAILED_PHASES = [
  LOGOUT_PHASE.IDLE,
  LOGOUT_PHASE.CONFIRMING,
  LOGOUT_PHASE.PENDING,
] as const;

export const ERROR_MESSAGE = LOGOUT_COPY.ERROR;
export const BUTTON_LABEL = LOGOUT_COPY.BUTTON;
