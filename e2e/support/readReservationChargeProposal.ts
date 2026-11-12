import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_CHARGE_SQL as sql } from "../constants/E2eReservationChargeSql.constants";
import { runWorkerSql } from "./runWorkerSql";

export const readReservationChargeProposal = async (
  workerId: string,
  reservationId: string
): Promise<number> =>
  Number(
    await runWorkerSql(
      values.PROPOSAL_OPERATION,
      sql.PROPOSAL,
      workerId,
      { reservation: reservationId }
    )
  );
