import { STRING } from "@/app/constants";
import {
  E2E_RESERVATION_SPLIT as values,
  E2E_RESERVATION_SPLIT_SEED as seed,
  E2E_RESERVATION_SPLIT_SQL as sql,
  E2E_RESERVATION_SPLIT_UNIT_BY_PROJECT as unitByProject,
} from "../constants/E2eReservationSplit.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import type { ReservationSplitFixture } from "./models/ReservationSplitFixture.interface";
import { runWorkerSql } from "./runWorkerSql";

const ID_CODE_SEPARATOR = ",";

export const createReservationSplitFixture = async (
  workerId: string,
  projectName: string,
  overrides: Readonly<Record<string, string>> = {}
): Promise<ReservationSplitFixture> => {
  const customerName = buildE2eCustomerName();
  const unit = unitByProject[projectName];
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
      unit,
      ...overrides,
    }
  );
  const [id, code] = created.split(ID_CODE_SEPARATOR);

  return {
    code,
    customerName,
    id,
    unitLabel: [values.UNIT_CATEGORY, unit].join(
      STRING.SPACE
    ),
  };
};
