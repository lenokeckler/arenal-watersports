import type { NullableUndefined } from "@/app/types";
import { STRING } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";

export const validateExtraName = (
  name: string
): NullableUndefined<string> =>
  name.trim() === STRING.Empty
    ? EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
    : undefined;
