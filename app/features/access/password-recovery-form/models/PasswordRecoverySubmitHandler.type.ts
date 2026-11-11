import type { PasswordRecoverySubmitEvent } from "./PasswordRecoverySubmitEvent.type";

export type PasswordRecoverySubmitHandler = (
  event: PasswordRecoverySubmitEvent
) => void;
