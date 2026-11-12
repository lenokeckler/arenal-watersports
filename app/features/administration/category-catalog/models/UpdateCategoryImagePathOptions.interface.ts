import type { NullableRef } from "@/app/types";
import type { CategoryImageRowAccessOptions } from "./CategoryImageRowAccessOptions.interface";

export interface UpdateCategoryImagePathOptions extends CategoryImageRowAccessOptions {
  adminWorkerId: string;
  imagePath: NullableRef<string>;
}
