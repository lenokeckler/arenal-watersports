import { CUSTOM_COMBO_PRICING_COPY } from "../constants/CustomComboPricingCopy.constants";
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import type { CustomComboPricingRequestOptions } from "../models/CustomComboPricingRequestOptions.interface";
import type { CustomComboPricingState } from "../models/CustomComboPricingState.type";
import { getCustomComboPricingAction } from "../actions/getCustomComboPricingAction";

const buildErrorState = (
  message: string
): CustomComboPricingState => ({
  message,
  pricing: null,
  status: CUSTOM_COMBO_PRICING_STATUS.ERROR,
});

export const requestCustomComboPricing = async (
  options: CustomComboPricingRequestOptions
): Promise<void> => {
  try {
    const result = await getCustomComboPricingAction(
      options.input
    );
    if (!options.isCurrentRequest()) {
      return;
    }
    if (!result.ok) {
      options.setState(
        buildErrorState(
          result.errors.items ??
            CUSTOM_COMBO_PRICING_COPY.ERROR
        )
      );
      return;
    }
    options.setState({
      message: null,
      pricing: result.pricing,
      status: CUSTOM_COMBO_PRICING_STATUS.READY,
    });
  } catch {
    if (options.isCurrentRequest()) {
      options.setState(
        buildErrorState(CUSTOM_COMBO_PRICING_COPY.ERROR)
      );
    }
  }
};
