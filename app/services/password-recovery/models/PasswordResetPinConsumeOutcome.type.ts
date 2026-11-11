import type { NullableRef } from "@/app/types";

export type PasswordResetPinConsumeOutcome =
  | { failed: false; workerId: NullableRef<string> }
  | { failed: true };
