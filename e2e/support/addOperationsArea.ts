import { E2E_WORK_MODE_SQL } from "../constants/E2eWorkMode.constants";
import { runWorkerSql } from "./runWorkerSql";

export const addOperationsArea = async (
  userId: string
): Promise<void> => {
  await runWorkerSql(
    E2E_WORK_MODE_SQL.ADD_OPERATIONS_OPERATION,
    E2E_WORK_MODE_SQL.ADD_OPERATIONS,
    userId
  );
};
