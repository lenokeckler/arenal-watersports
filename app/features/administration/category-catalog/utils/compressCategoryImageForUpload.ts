import type { NullableRef } from "@/app/types";
import { compressCategoryImage } from "@/app/utils/category-image/compressCategoryImage";

export const compressCategoryImageForUpload = async (
  file: File
): Promise<NullableRef<File>> => {
  try {
    return await compressCategoryImage(file);
  } catch {
    return null;
  }
};
