import {
  E2E_RESERVATION_CHARGE_CURRENCY as currencyValues,
  E2E_RESERVATION_CHARGE_CURRENCY_SQL as sql,
} from "../constants/E2eReservationChargeCurrency.constants";
import { runWorkerSql } from "./runWorkerSql";

export const removeUsdOnlyCategories = async (
  workerId: string,
  categoryNamePattern: string
): Promise<void> => {
  await runWorkerSql(
    currencyValues.REMOVE_OPERATION,
    sql.REMOVE,
    workerId,
    { category: categoryNamePattern }
  );
};
