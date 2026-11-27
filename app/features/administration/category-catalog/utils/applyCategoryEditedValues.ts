import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryEditedValues } from "../models/CategoryEditedValues.interface";
import { applyCategoryAlertValues } from "./applyCategoryAlertValues";
import { applyCategoryDepositValues } from "./applyCategoryDepositValues";
import { applyCategoryReservationValues } from "./applyCategoryReservationValues";
import { applyCategoryTraitValues } from "./applyCategoryTraitValues";

export const applyCategoryEditedValues = (
  configuration: CategoryConfiguration,
  edited: CategoryEditedValues
): CategoryConfiguration => {
  const withReservations = applyCategoryReservationValues(
    configuration,
    edited.behavior
  );
  const withTraits = applyCategoryTraitValues(
    withReservations,
    edited.behavior
  );
  const withDeposit = applyCategoryDepositValues(
    withTraits,
    edited.deposit
  );

  return applyCategoryAlertValues(
    withDeposit,
    edited.alerts
  );
};
