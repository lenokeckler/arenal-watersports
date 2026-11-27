import type { NullableRef } from "@/app/types";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import { hasExtraFormErrors } from "./hasExtraFormErrors";
import { validateExtraInput } from "./validateExtraInput";

export const resolveExtraValidationResult = (
  input: unknown
): NullableRef<ExtraMutationResult> => {
  const { name, occupancy, ...priceErrors } =
    validateExtraInput(input);
  if (
    !name &&
    !occupancy &&
    !hasExtraFormErrors(priceErrors)
  ) {
    return null;
  }

  return {
    status: EXTRA_MUTATION_STATUS.ERROR,
    nameError: name,
    occupancyError: occupancy,
    priceErrors: hasExtraFormErrors(priceErrors)
      ? priceErrors
      : undefined,
  };
};
