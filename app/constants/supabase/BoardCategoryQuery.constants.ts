export const BOARD_CATEGORY_QUERY = {
  ORDER_BY: "category_name",
  PROJECTION:
    "category_id,category_name,group_name,free_count,in_use_count,total_count",
  VIEW: "board_category_summary",
} as const;

export const BOARD_CATEGORY_OPERATION =
  "read board categories";
