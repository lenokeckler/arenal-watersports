import { LENGTH } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";

export const resolveFixFieldsLabel = (
  invalidFieldCount: number
): string =>
  invalidFieldCount === LENGTH.ONE
    ? CATEGORY_CONFIGURE_SAVE_COPY.FIX_FIELDS_SINGULAR
    : CATEGORY_CONFIGURE_SAVE_COPY.FIX_FIELDS_PLURAL(
        invalidFieldCount
      );
