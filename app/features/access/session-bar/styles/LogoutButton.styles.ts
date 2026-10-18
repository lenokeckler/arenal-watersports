import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import type { LogoutPhase } from "../models/LogoutPhase.type";

export const LOGOUT_BUTTON_CLASS =
  "inline-flex min-h-12 items-center justify-center gap-sm rounded-lg border px-md py-xs text-center text-button font-semibold uppercase tracking-widest text-on-surface transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

export const LOGOUT_BUTTON_IDLE_CLASS =
  "border-outline hover:border-primary active:bg-primary/10";

export const LOGOUT_BUTTON_CONFIRMING_CLASS =
  "border-primary bg-primary/10 active:bg-primary/20";

export const LOGOUT_BUTTON_PENDING_CLASS =
  "border-outline opacity-70";

const LOGOUT_BUTTON_PHASE_CLASS: Record<
  LogoutPhase,
  string
> = {
  [LOGOUT_PHASE.IDLE]: LOGOUT_BUTTON_IDLE_CLASS,
  [LOGOUT_PHASE.CONFIRMING]: LOGOUT_BUTTON_CONFIRMING_CLASS,
  [LOGOUT_PHASE.PENDING]: LOGOUT_BUTTON_PENDING_CLASS,
  [LOGOUT_PHASE.FAILED]: LOGOUT_BUTTON_IDLE_CLASS,
};

export const resolveLogoutButtonClassName = (
  phase: LogoutPhase
): string =>
  joinClassNames(
    LOGOUT_BUTTON_CLASS,
    LOGOUT_BUTTON_PHASE_CLASS[phase]
  );
