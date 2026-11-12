import type { NullableRef } from "@/app/types";
import type { CategoryImageDecoded } from "./CategoryImageDecoded.interface";
import type { CategoryImageEncodeOptions } from "./CategoryImageEncodeOptions.interface";

export interface CategoryImageCompressionPrimitives {
  decode: (file: File) => Promise<CategoryImageDecoded>;
  encode: (
    options: CategoryImageEncodeOptions
  ) => Promise<NullableRef<Blob>>;
}
