import { LENGTH } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import type { CategoryConfigureSaveMessageOptions } from "../models/CategoryConfigureSaveMessageOptions.interface";
import type { NullableRef } from "@/app/types";
import { resolveDirtyLabel } from "./resolveDirtyLabel";
import { resolveFixFieldsLabel } from "./resolveFixFieldsLabel";

export const resolveCategoryConfigureSaveMessage = ({
  status,
  changedCount,
  invalidFieldCount,
}: CategoryConfigureSaveMessageOptions): NullableRef<string> => {
  if (status === CATEGORY_CONFIGURE_SAVE_STATUS.SAVING) {
    return null;
  }
  if (status === CATEGORY_CONFIGURE_SAVE_STATUS.FAILED) {
    return CATEGORY_CONFIGURE_SAVE_COPY.FAILED;
  }
  if (invalidFieldCount > LENGTH.ZERO) {
    return resolveFixFieldsLabel(invalidFieldCount);
  }
  if (changedCount > LENGTH.ZERO) {
    return resolveDirtyLabel(changedCount);
  }

  return status === CATEGORY_CONFIGURE_SAVE_STATUS.SAVED
    ? CATEGORY_CONFIGURE_SAVE_COPY.SAVED
    : null;
};
