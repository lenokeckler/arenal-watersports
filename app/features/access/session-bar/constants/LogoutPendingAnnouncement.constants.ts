import { STRING } from "@/app/constants";
import type { LogoutPhase } from "../models/LogoutPhase.type";
import { LOGOUT_COPY } from "./LogoutCopy.constants";
import { LOGOUT_PHASE } from "./LogoutPhase.constants";

export const LOGOUT_PENDING_ANNOUNCEMENT: Record<
  LogoutPhase,
  string
> = {
  [LOGOUT_PHASE.IDLE]: STRING.Empty,
  [LOGOUT_PHASE.CONFIRMING]: STRING.Empty,
  [LOGOUT_PHASE.PENDING]: LOGOUT_COPY.PENDING,
  [LOGOUT_PHASE.FAILED]: STRING.Empty,
};
