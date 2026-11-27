import type { DepositResolutionRecorded } from "./DepositResolutionRecorded.interface";

export interface DepositResolutionSuccessProps {
  code: string;
  recorded: DepositResolutionRecorded;
}
