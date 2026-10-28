import type { NullableUndefined } from "@/app/types";
import type { SearchParamValue } from "@/app/utils/sign-in/models/SearchParamValue.type";

export interface LoginFormProps {
  notice: NullableUndefined<string | string[]>;
  reason: SearchParamValue;
}
