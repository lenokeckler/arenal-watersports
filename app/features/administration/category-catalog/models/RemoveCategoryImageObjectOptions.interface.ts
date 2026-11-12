import type { CategoryImageStorageHost } from "./CategoryImageStorageHost.interface";

export interface RemoveCategoryImageObjectOptions {
  imagePath: string;
  supabase: CategoryImageStorageHost;
}
