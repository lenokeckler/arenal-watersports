import { E2E_WORKER_MARKS_SQL } from "../constants/E2eWorkerMarks.constants";
import { runWorkerSql } from "./runWorkerSql";

export const countWorkerMark = async (
  userId: string,
  mark: string
): Promise<number> =>
  Number(
    await runWorkerSql(
      E2E_WORKER_MARKS_SQL.MARK_OPERATION,
      E2E_WORKER_MARKS_SQL.COUNT_MARK,
      userId,
      { [E2E_WORKER_MARKS_SQL.MARK_VARIABLE]: mark }
    )
  );
