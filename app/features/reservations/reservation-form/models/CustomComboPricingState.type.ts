import type { NullableRef } from "@/app/types";
import type { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import type { CustomComboPricing } from "./CustomComboPricing.interface";

export type CustomComboPricingStatus =
  (typeof CUSTOM_COMBO_PRICING_STATUS)[keyof typeof CUSTOM_COMBO_PRICING_STATUS];

export interface CustomComboPricingState {
  message: NullableRef<string>;
  pricing: NullableRef<CustomComboPricing>;
  status: CustomComboPricingStatus;
}
