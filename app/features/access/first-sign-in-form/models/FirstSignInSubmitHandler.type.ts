import type { FirstSignInSubmitEvent } from "./FirstSignInSubmitEvent.type";

export type FirstSignInSubmitHandler = (
  event: FirstSignInSubmitEvent
) => void;
