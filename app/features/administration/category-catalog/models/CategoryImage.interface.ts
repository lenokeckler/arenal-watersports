import type { NullableRef } from "@/app/types";

export interface CategoryImage {
  categoryId: string;
  categoryName: string;
  imagePath: NullableRef<string>;
  imageUrl: NullableRef<string>;
}
