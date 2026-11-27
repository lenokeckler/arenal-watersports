import { LENGTH } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";

export const resolveDirtyLabel = (
  changedCount: number
): string =>
  changedCount === LENGTH.ONE
    ? CATEGORY_CONFIGURE_SAVE_COPY.DIRTY_SINGULAR
    : CATEGORY_CONFIGURE_SAVE_COPY.DIRTY_PLURAL(
        changedCount
      );
