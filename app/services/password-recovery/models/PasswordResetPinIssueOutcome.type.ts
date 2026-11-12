import type { NullableRef } from "@/app/types";
import type { IssuedPasswordResetPin } from "./IssuedPasswordResetPin.interface";

export type PasswordResetPinIssueOutcome =
  | {
      failed: false;
      issued: NullableRef<IssuedPasswordResetPin>;
    }
  | { failed: true };
