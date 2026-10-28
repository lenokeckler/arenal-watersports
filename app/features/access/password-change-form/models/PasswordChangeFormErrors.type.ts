import type { PasswordChangeField } from "@/app/constants/access/PasswordChangeError.constants";
import type { NullableRef } from "@/app/types";

export type PasswordChangeFormErrors = Record<
  PasswordChangeField,
  NullableRef<string>
>;
