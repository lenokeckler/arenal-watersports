import type { Database } from "@/app/types";

export type BoardCategoryRow = Omit<
  Database["public"]["Views"]["board_category_summary"]["Row"],
  "image_path"
>;
