import { RESERVATION_STATUS } from "@/app/constants";
import {
  E2E_RESERVATION_EXTRA_TIME as values,
  E2E_RESERVATION_EXTRA_TIME_SCENARIO as SCENARIO,
} from "../constants/E2eReservationExtraTime.constants";
import { E2E_RESERVATION_EXTRA_TIME_SQL as sql } from "../constants/E2eReservationExtraTimeSql.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import type { ReservationExtraTimeFixture } from "./models/ReservationExtraTimeFixture.interface";
import type { ReservationExtraTimeScenario } from "./models/ReservationExtraTimeScenario.type";
import { runWorkerSql } from "./runWorkerSql";

export const createReservationExtraTimeFixture = async (
  workerId: string,
  scenario: ReservationExtraTimeScenario
): Promise<ReservationExtraTimeFixture> => {
  const created = await runWorkerSql(
    values.FIXTURE_OPERATION,
    sql.SEED[scenario],
    workerId,
    {
      customer: buildE2eCustomerName(),
      status:
        scenario === SCENARIO.OUT
          ? RESERVATION_STATUS.DISPATCHED
          : RESERVATION_STATUS.CLOSED,
    }
  );
  const resultLine =
    created.split(values.LINE_SEPARATOR).at(-1) ?? created;
  const [id, code] = resultLine.split(
    values.ID_CODE_SEPARATOR
  );

  return { code, id };
};
