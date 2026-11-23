import { LENGTH, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";

export const resolveMissingNote = ({
  behavior,
  currentQuantity,
  image,
}: CategoryConfiguration): NullableRef<string> => {
  const missingItems: string[] = [];
  if (currentQuantity === LENGTH.ZERO) {
    missingItems.push(
      CATEGORY_CONFIGURE_COPY.MISSING_STOCK
    );
  }
  if (
    behavior.isReservable &&
    !behavior.defaultDurationMinutes
  ) {
    missingItems.push(
      CATEGORY_CONFIGURE_COPY.MISSING_DURATION
    );
  }
  if (!image.imagePath) {
    missingItems.push(
      CATEGORY_CONFIGURE_COPY.MISSING_PHOTO
    );
  }

  if (missingItems.length === LENGTH.ZERO) {
    return null;
  }

  return [
    CATEGORY_CONFIGURE_COPY.MISSING_PREFIX,
    missingItems.join(STRING.COMMA_SPACE),
  ].join(STRING.SPACE);
};
