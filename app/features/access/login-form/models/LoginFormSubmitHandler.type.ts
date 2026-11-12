import type { LoginFormSubmitEvent } from "./LoginFormSubmitEvent.type";

export type LoginFormSubmitHandler = (
  event: LoginFormSubmitEvent
) => void;
