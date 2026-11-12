import { E2E_WORK_MODE_SQL } from "../constants/E2eWorkMode.constants";
import { runWorkerSql } from "./runWorkerSql";

export const readLastWorkMode = (
  userId: string
): Promise<string> =>
  runWorkerSql(
    E2E_WORK_MODE_SQL.READ_OPERATION,
    E2E_WORK_MODE_SQL.READ_MODE,
    userId
  );
