import { STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";

export const formatCategoryDurationLabel = (
  minutes: number
): string =>
  [minutes, CATEGORY_CONFIGURE_COPY.DURATION_UNIT].join(
    STRING.SPACE
  );
