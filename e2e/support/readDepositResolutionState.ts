import { STRING } from "@/app/constants";
import { E2E_DEPOSIT_RESOLUTION as values } from "../constants/E2eDepositResolution.constants";
import { E2E_DEPOSIT_RESOLUTION_SQL as sql } from "../constants/E2eDepositResolutionSql.constants";
import type { DepositResolutionState } from "./models/DepositResolutionState.interface";
import { runWorkerSql } from "./runWorkerSql";

export const readDepositResolutionState = async (
  workerId: string,
  depositId: string
): Promise<DepositResolutionState> => {
  const row = await runWorkerSql(
    values.READ_OPERATION,
    sql.READ,
    workerId,
    { deposit: depositId }
  );
  const [status, keptAmount, reason, isResolver] =
    row.split(values.FIELD_SEPARATOR);

  return {
    isResolver: isResolver === STRING.TRUE,
    keptAmount,
    reason,
    status,
  };
};
