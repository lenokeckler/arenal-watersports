import { E2E_WORKER_AREAS_SQL } from "../constants/E2eWorkerAreas.constants";
import { runWorkerSql } from "./runWorkerSql";

export const countReservationsArea = async (
  userId: string
): Promise<number> =>
  Number(
    await runWorkerSql(
      E2E_WORKER_AREAS_SQL.OPERATION,
      E2E_WORKER_AREAS_SQL.HAS_RESERVATIONS,
      userId
    )
  );
