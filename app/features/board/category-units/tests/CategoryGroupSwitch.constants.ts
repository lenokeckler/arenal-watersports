import type { BoardCategoryIdentity } from "@/app/utils/board-categories/models/BoardCategoryIdentity.interface";

export const GROUP_DOUBLE: BoardCategoryIdentity = {
  id: "bbbbbbbb-0000-0000-0000-000000000011",
  name: "Kayak doble",
};

export const GROUP_INDIVIDUAL: BoardCategoryIdentity = {
  id: "bbbbbbbb-0000-0000-0000-000000000012",
  name: "Kayak individual",
};

export const GROUP_MEMBERS = [
  GROUP_DOUBLE,
  GROUP_INDIVIDUAL,
];

export const ARIA_CURRENT_ATTRIBUTE = "aria-current";

export const HREF_ATTRIBUTE = "href";
