import { CATEGORY_IMAGE, SUPABASE } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const resolveCategoryImageUrl = (
  imagePath: NullableRef<string>
): NullableRef<string> => {
  if (!imagePath) {
    return null;
  }

  const objectPath = [
    CATEGORY_IMAGE.PUBLIC_OBJECT_PATH,
    CATEGORY_IMAGE.BUCKET,
    imagePath,
  ].join(CATEGORY_IMAGE.PATH_SEPARATOR);

  return `${SUPABASE.URL}${objectPath}`;
};
