import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { SaveExtraOptions } from "../models/SaveExtraOptions.type";
import { createExtraAction } from "../services/createExtraAction";
import { updateExtraAction } from "../services/updateExtraAction";

export const saveExtra = (
  options: SaveExtraOptions
): Promise<ExtraMutationResult> => {
  if (options.mode === EXTRA_FORM_MODE.CREATE) {
    return createExtraAction(options.values);
  }

  return updateExtraAction({
    extraId: options.extra.id,
    ...options.values,
  });
};
