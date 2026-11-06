import type { PasswordRecoveryField } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export type PasswordRecoveryFormErrors = Record<
  PasswordRecoveryField,
  NullableRef<string>
>;
