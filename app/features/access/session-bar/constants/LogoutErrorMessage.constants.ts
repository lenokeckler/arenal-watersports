import type { NullableRef } from "@/app/types";
import type { LogoutPhase } from "../models/LogoutPhase.type";
import { LOGOUT_COPY } from "./LogoutCopy.constants";
import { LOGOUT_PHASE } from "./LogoutPhase.constants";

export const LOGOUT_ERROR_MESSAGE: Record<
  LogoutPhase,
  NullableRef<string>
> = {
  [LOGOUT_PHASE.IDLE]: null,
  [LOGOUT_PHASE.CONFIRMING]: null,
  [LOGOUT_PHASE.PENDING]: null,
  [LOGOUT_PHASE.FAILED]: LOGOUT_COPY.ERROR,
};
