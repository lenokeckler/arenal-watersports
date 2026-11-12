import type { CustomComboPricing } from "./CustomComboPricing.interface";
import type { CustomComboReservationField } from "./CustomComboReservationField.constants";
import type { NullableRef } from "@/app/types";

export type CustomComboPricingActionResult =
  | {
      errors: Partial<
        Record<CustomComboReservationField, string>
      >;
      ok: false;
    }
  | {
      ok: true;
      pricing: NullableRef<CustomComboPricing>;
    };
