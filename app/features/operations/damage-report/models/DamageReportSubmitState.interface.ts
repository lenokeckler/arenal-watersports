import type { NullableRef } from "@/app/types";

export interface DamageReportSubmitState {
  errorMessage: NullableRef<string>;
  isSubmitting: boolean;
  send: (detailLater: boolean) => Promise<void>;
}
