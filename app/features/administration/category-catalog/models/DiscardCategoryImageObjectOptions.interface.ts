import type { NullableRef } from "@/app/types";
import type { CategoryImageStorageHost } from "./CategoryImageStorageHost.interface";

export interface DiscardCategoryImageObjectOptions {
  imagePath: NullableRef<string>;
  supabase: CategoryImageStorageHost;
}
