import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationChargeFixtures } from "./removeReservationChargeFixtures";
import { removeUsdOnlyCategories } from "./removeUsdOnlyCategories";

export const removeUsdOnlyChargeFixture = async (
  activeWorker: ActiveWorker,
  categoryName: string
): Promise<void> => {
  try {
    await removeReservationChargeFixtures(activeWorker);
  } finally {
    await removeUsdOnlyCategories(
      activeWorker.id,
      categoryName
    );
  }
};
