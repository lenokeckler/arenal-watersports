import { STRING } from "@/app/constants";
import { E2E_RESERVATION_CHARGE_SLOT_BY_PROJECT as slotByProject } from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_DEPOSIT as values } from "../constants/E2eReservationDeposit.constants";
import { E2E_RESERVATION_DEPOSIT_SQL as sql } from "../constants/E2eReservationDepositSql.constants";
import { runWorkerSql } from "./runWorkerSql";

export const setE2eCategoryDeposit = async (
  workerId: string,
  projectName: string,
  isSet: boolean
): Promise<void> => {
  const slot = slotByProject[projectName];
  if (!slot) {
    return;
  }
  await runWorkerSql(
    values.CATEGORY_OPERATION,
    sql.SET_CATEGORY_DEPOSIT,
    workerId,
    {
      crc: isSet
        ? String(values.CATEGORY_DEPOSIT_CRC)
        : STRING.Empty,
      unit: slot.unit,
      usd: isSet
        ? String(values.CATEGORY_DEPOSIT_USD)
        : STRING.Empty,
    }
  );
};
