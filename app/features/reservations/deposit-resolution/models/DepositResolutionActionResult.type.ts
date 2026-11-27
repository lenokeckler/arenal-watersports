import type { DepositResolutionErrors } from "./DepositResolutionErrors.interface";
import type { DepositResolutionRecorded } from "./DepositResolutionRecorded.interface";

export type DepositResolutionActionResult =
  | {
      ok: true;
      recorded: DepositResolutionRecorded;
    }
  | {
      errors: DepositResolutionErrors;
      formError?: string;
      ok: false;
    };
