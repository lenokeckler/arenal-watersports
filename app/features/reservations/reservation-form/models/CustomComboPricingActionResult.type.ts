import type { CustomComboPricing } from "./CustomComboPricing.interface";
import type { CustomComboReservationField } from "./CustomComboReservationField.constants";

export type CustomComboPricingActionResult =
  | {
      errors: Partial<
        Record<CustomComboReservationField, string>
      >;
      ok: false;
    }
  | {
      ok: true;
      pricing: CustomComboPricing;
    };
