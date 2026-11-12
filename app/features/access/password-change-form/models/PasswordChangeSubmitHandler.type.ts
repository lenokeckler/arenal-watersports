import type { PasswordChangeSubmitEvent } from "./PasswordChangeSubmitEvent.type";

export type PasswordChangeSubmitHandler = (
  event: PasswordChangeSubmitEvent
) => void;
