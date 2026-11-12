import type { LogoutPhase } from "../models/LogoutPhase.type";
import { LOGOUT_COPY } from "./LogoutCopy.constants";
import { LOGOUT_PHASE } from "./LogoutPhase.constants";

export const LOGOUT_BUTTON_LABEL: Record<
  LogoutPhase,
  string
> = {
  [LOGOUT_PHASE.IDLE]: LOGOUT_COPY.BUTTON,
  [LOGOUT_PHASE.CONFIRMING]: LOGOUT_COPY.CONFIRM,
  [LOGOUT_PHASE.PENDING]: LOGOUT_COPY.PENDING,
  [LOGOUT_PHASE.FAILED]: LOGOUT_COPY.BUTTON,
};
