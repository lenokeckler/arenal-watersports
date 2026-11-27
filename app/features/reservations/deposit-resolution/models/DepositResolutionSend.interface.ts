import type { NullableRef } from "@/app/types";
import type { DepositResolutionRecorded } from "./DepositResolutionRecorded.interface";

export interface DepositResolutionSend {
  isSubmitting: boolean;
  mayBeRecorded: boolean;
  recorded: NullableRef<DepositResolutionRecorded>;
  send: () => Promise<void>;
}
