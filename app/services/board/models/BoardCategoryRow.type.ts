import type { Database } from "@/app/types";

export type BoardCategoryRow =
  Database["public"]["Views"]["board_category_summary"]["Row"];
