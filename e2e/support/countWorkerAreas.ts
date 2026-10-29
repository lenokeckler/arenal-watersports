import { E2E_WORKER_MARKS_SQL } from "../constants/E2eWorkerMarks.constants";
import { runWorkerSql } from "./runWorkerSql";

export const countWorkerAreas = async (
  userId: string
): Promise<number> =>
  Number(
    await runWorkerSql(
      E2E_WORKER_MARKS_SQL.AREAS_OPERATION,
      E2E_WORKER_MARKS_SQL.COUNT_AREAS,
      userId
    )
  );
