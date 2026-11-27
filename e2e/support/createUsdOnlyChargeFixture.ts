import { randomUUID } from "node:crypto";
import { STRING } from "@/app/constants";
import {
  E2E_RESERVATION_CHARGE as values,
  E2E_RESERVATION_CHARGE_SEED as seed,
  E2E_RESERVATION_CHARGE_SLOT_BY_PROJECT as slotByProject,
} from "../constants/E2eReservationCharge.constants";
import {
  E2E_RESERVATION_CHARGE_CURRENCY as currencyValues,
  E2E_RESERVATION_CHARGE_CURRENCY_SQL as sql,
} from "../constants/E2eReservationChargeCurrency.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { failE2eOperation } from "./failE2eOperation";
import type { UsdOnlyChargeFixture } from "./models/UsdOnlyChargeFixture.interface";
import { runWorkerSql } from "./runWorkerSql";

export const createUsdOnlyChargeFixture = async (
  workerId: string,
  projectName: string
): Promise<UsdOnlyChargeFixture> => {
  const slot = slotByProject[projectName];
  if (!slot) {
    return failE2eOperation(
      currencyValues.FIXTURE_OPERATION,
      `${values.MISSING_SLOT}: ${projectName}`
    );
  }
  const token = randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(0, currencyValues.TOKEN_LENGTH);
  const categoryName = `${currencyValues.CATEGORY_PREFIX}${token}`;
  const customerName = buildE2eCustomerName();
  const created = await runWorkerSql(
    currencyValues.FIXTURE_OPERATION,
    sql.SEED,
    workerId,
    {
      category: categoryName,
      customer: customerName,
      duration: values.DURATION_MINUTES,
      hour: slot.hour,
      people: values.PEOPLE_COUNT,
      tariff_usd: currencyValues.USD_TARIFF,
      type: seed.type,
      unit: `${currencyValues.UNIT_PREFIX}${token}`,
    }
  );
  const [id, code] = created.split(
    values.ID_CODE_SEPARATOR
  );

  return { categoryName, code, customerName, id };
};
