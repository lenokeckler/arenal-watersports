import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { Extra } from "../models/Extra.interface";

export const buildExtraOccupancyLabel = ({
  occupiesQuantity,
  occupiedCategoryName,
}: Extra): string =>
  occupiesQuantity === null || occupiedCategoryName === null
    ? EXTRA_OCCUPANCY_COPY.CHARGE_ONLY_LABEL
    : EXTRA_OCCUPANCY_COPY.OCCUPIES_LABEL(
        occupiesQuantity,
        occupiedCategoryName
      );
