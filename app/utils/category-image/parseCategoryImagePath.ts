import {
  CATEGORY_IMAGE,
  TYPE_OF,
  UUID_PATTERN,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isAllowedExtension = (extension: string): boolean =>
  Object.values(CATEGORY_IMAGE.EXTENSION_BY_MIME).some(
    (allowedExtension) => allowedExtension === extension
  );

export const parseCategoryImagePath = (
  input: unknown,
  categoryId: string
): NullableRef<string> => {
  if (!isString(input) || !UUID_PATTERN.test(categoryId)) {
    return null;
  }

  const prefix = `${categoryId}${CATEGORY_IMAGE.PATH_SEPARATOR}`;

  if (!input.startsWith(prefix)) {
    return null;
  }

  const [objectId, extension, ...extraSegments] = input
    .slice(prefix.length)
    .split(CATEGORY_IMAGE.EXTENSION_SEPARATOR);

  const isValid =
    extraSegments.length === 0 &&
    UUID_PATTERN.test(objectId) &&
    isAllowedExtension(extension);

  return isValid ? input : null;
};
