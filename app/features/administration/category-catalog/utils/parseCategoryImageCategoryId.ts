import { TYPE_OF, UUID_PATTERN } from "@/app/constants";
import type { NullableRef } from "@/app/types";

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

export const parseCategoryImageCategoryId = (
  input: unknown
): NullableRef<string> =>
  isString(input) && UUID_PATTERN.test(input)
    ? input
    : null;
