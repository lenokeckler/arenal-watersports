import { STRING } from "@/app/constants";
import {
  E2E_RESERVATION_SPLIT as values,
  E2E_RESERVATION_SPLIT_SEED as seed,
  E2E_RESERVATION_SPLIT_SQL as sql,
  E2E_RESERVATION_SPLIT_SLOT_BY_PROJECT as slotByProject,
} from "../constants/E2eReservationSplit.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import type { ReservationSplitFixture } from "./models/ReservationSplitFixture.interface";
import { failE2eOperation } from "./failE2eOperation";
import { runWorkerSql } from "./runWorkerSql";

export const createReservationSplitFixture = async (
  workerId: string,
  projectName: string,
  overrides: Readonly<Record<string, string>> = {}
): Promise<ReservationSplitFixture> => {
  const customerName = buildE2eCustomerName();
  const slot = slotByProject[projectName];
  if (!slot) {
    return failE2eOperation(
      values.FIXTURE_OPERATION,
      `${values.MISSING_UNIT}: ${projectName}`
    );
  }
  const created = await runWorkerSql(
    values.FIXTURE_OPERATION,
    sql.SEED,
    workerId,
    {
      ...seed,
      category: values.CATEGORY,
      charge_amount: values.CHARGE_AMOUNT,
      customer: customerName,
      deposit_amount: values.DEPOSIT_AMOUNT,
      people: values.PEOPLE,
      quantity: values.QUANTITY,
      unit: slot.unit,
      ...overrides,
    }
  );
  const [id, code] = created.split(
    values.ID_CODE_SEPARATOR
  );

  return {
    code,
    customerName,
    departureTime: slot.time,
    id,
    unitLabel: [values.UNIT_CATEGORY, slot.unit].join(
      STRING.SPACE
    ),
  };
};
