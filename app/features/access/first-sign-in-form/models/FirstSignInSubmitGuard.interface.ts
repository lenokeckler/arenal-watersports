import type { FirstSignInSubmitHandler } from "./FirstSignInSubmitHandler.type";

export interface FirstSignInSubmitGuard {
  hasSubmitted: boolean;
  invalidSubmitCount: number;
  onSubmit: FirstSignInSubmitHandler;
  showFailures: boolean;
}
