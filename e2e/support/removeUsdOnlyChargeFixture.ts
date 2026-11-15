import {
  E2E_RESERVATION_CHARGE_CURRENCY as currencyValues,
  E2E_RESERVATION_CHARGE_CURRENCY_SQL as sql,
} from "../constants/E2eReservationChargeCurrency.constants";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { removeReservationChargeFixtures } from "./removeReservationChargeFixtures";
import { runWorkerSql } from "./runWorkerSql";

export const removeUsdOnlyChargeFixture = async (
  activeWorker: ActiveWorker,
  categoryName: string
): Promise<void> => {
  try {
    await removeReservationChargeFixtures(activeWorker);
  } finally {
    await runWorkerSql(
      currencyValues.REMOVE_OPERATION,
      sql.REMOVE,
      activeWorker.id,
      { category: categoryName }
    );
  }
};
