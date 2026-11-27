import type { NullableRef } from "@/app/types";

export interface DamageSubmitStatus {
  errorMessage: NullableRef<string>;
  isSubmitting: boolean;
}
