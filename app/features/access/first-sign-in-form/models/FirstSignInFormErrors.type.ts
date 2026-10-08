import type { FirstSignInField } from "@/app/constants/access/FirstSignInError.constants";
import type { NullableRef } from "@/app/types";

export type FirstSignInFormErrors = Record<
  FirstSignInField,
  NullableRef<string>
>;
