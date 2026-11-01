"use client";

import { useRouter } from "next/navigation";
import { UNIT_FORM_INITIAL_VALUES } from "../constants/UnitFormInitialValues.constants";
import type { UnitFormViewModel } from "../models/UnitFormViewModel.interface";
import type { UnitFormViewModelProps } from "../models/UnitFormViewModelProps.interface";
import { buildUnitDecommissionedNotice } from "../utils/buildUnitDecommissionedNotice";
import { mapUnitRowToFormValues } from "../utils/mapUnitRowToFormValues";
import { resolveCategoryUnitsPath } from "../utils/resolveUnitPaths";
import { useUnitFormFields } from "./useUnitFormFields";
import { useUnitFormSubmit } from "./useUnitFormSubmit";

export const useUnitFormViewModel = ({
  mode,
  category,
  unit,
}: UnitFormViewModelProps): UnitFormViewModel => {
  const router = useRouter();
  const { showValidationErrors, setCodeError, ...fields } =
    useUnitFormFields({
      initialValues: unit
        ? mapUnitRowToFormValues(unit)
        : UNIT_FORM_INITIAL_VALUES,
    });
  const { isSubmitting, onSubmit } = useUnitFormSubmit({
    mode,
    categoryId: category.id,
    unitId: unit?.id,
    hasMotor: category.hasMotor,
    values: fields.values,
    onValidationErrors: showValidationErrors,
    setCodeError,
  });

  const onBack = (): void => {
    router.push(resolveCategoryUnitsPath(category.id));
  };

  const decommissionedNotice = unit
    ? buildUnitDecommissionedNotice(unit)
    : null;

  return {
    ...fields,
    decommissionedNotice,
    isReadOnly: decommissionedNotice !== null,
    isStatusLocked: unit?.isOccupied ?? false,
    isSubmitting,
    onBack,
    onSubmit,
  };
};
