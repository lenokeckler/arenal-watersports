import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import { parseDefaultDurationMinutes } from "./parseDefaultDurationMinutes";

export const applyCategoryReservationValues = (
  configuration: CategoryConfiguration,
  values: CategoryBehaviorFormValues
): CategoryConfiguration => ({
  ...configuration,
  behavior: {
    ...configuration.behavior,
    isReservable: values.isReservable,
    guideOnly: values.guideOnly,
    defaultDurationMinutes: parseDefaultDurationMinutes(
      values.defaultDurationMinutes
    ),
  },
});
