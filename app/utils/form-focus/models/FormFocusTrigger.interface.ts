import type { NullableRef } from "@/app/types";

export interface FormFocusTrigger<TError> {
  invalidSubmitCount: number;
  serverError: NullableRef<TError>;
}
