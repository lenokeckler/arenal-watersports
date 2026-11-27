import { UUID_PATTERN } from "@/app/constants";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { isString } from "@/app/utils/type-guards/isString";

export const resolveLegacyUnitId = (
  value: NullableUndefined<string | string[]>
): NullableRef<string> =>
  isString(value) && UUID_PATTERN.test(value)
    ? value
    : null;
