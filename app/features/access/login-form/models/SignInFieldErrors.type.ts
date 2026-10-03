import type { SignInField } from "@/app/constants/access/SignInError.constants";
import type { NullableRef } from "@/app/types";

export type SignInFieldErrors = Record<
  SignInField,
  NullableRef<string>
>;
