import type { CustomComboPricingInput } from "./CustomComboPricingInput.interface";
import type { CustomComboPricingStateChangeHandler } from "./CustomComboPricingStateChangeHandler.type";

export interface CustomComboPricingRequestOptions {
  input: CustomComboPricingInput;
  isCurrentRequest: () => boolean;
  setState: CustomComboPricingStateChangeHandler;
}
