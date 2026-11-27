import type { DepositResolutionActionResult } from "./DepositResolutionActionResult.type";

export interface DepositResolutionSubmitOutcome {
  mayBeRecorded: boolean;
  result: DepositResolutionActionResult;
}
