import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";

export type LogoutPhase =
  (typeof LOGOUT_PHASE)[keyof typeof LOGOUT_PHASE];
