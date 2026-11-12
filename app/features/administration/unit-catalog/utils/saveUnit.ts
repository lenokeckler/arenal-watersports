import { safeString } from "@/app/utils/safe-value/SafeValue";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import type { SaveUnitOptions } from "../models/SaveUnitOptions.interface";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";
import { createUnitAction } from "../services/createUnitAction";
import { updateUnitAction } from "../services/updateUnitAction";
import { mapUnitFormValuesToInput } from "./mapUnitFormValuesToInput";

export const saveUnit = ({
  mode,
  categoryId,
  unitId,
  hasMotor,
  values,
}: SaveUnitOptions): Promise<UnitMutationResult> => {
  const input = mapUnitFormValuesToInput(values, {
    hasMotor,
  });

  if (mode === UNIT_FORM_MODE.CREATE) {
    return createUnitAction({ ...input, categoryId });
  }

  return updateUnitAction({
    ...input,
    unitId: safeString(unitId),
  });
};
