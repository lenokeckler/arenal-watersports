import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";

export const applyCategoryTraitValues = (
  configuration: CategoryConfiguration,
  values: CategoryBehaviorFormValues
): CategoryConfiguration => ({
  ...configuration,
  behavior: {
    ...configuration.behavior,
    hasMotor: values.hasMotor,
    consumesFuel: values.consumesFuel,
    canBeDamaged: values.canBeDamaged,
    hasConditionPhotos: values.hasConditionPhotos,
  },
});
