import type { PersonalEmailField } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export type PersonalEmailFormErrors = Record<
  PersonalEmailField,
  NullableRef<string>
>;
