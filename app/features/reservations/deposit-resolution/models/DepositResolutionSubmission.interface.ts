import type { NullableRef } from "@/app/types";
import type { DepositResolutionErrors } from "./DepositResolutionErrors.interface";
import type { DepositResolutionRecorded } from "./DepositResolutionRecorded.interface";

export interface DepositResolutionSubmission {
  clearErrors: () => void;
  errors: DepositResolutionErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  mayBeRecorded: boolean;
  recorded: NullableRef<DepositResolutionRecorded>;
}
