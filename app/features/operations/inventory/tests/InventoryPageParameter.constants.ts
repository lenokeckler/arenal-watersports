export const INVALID_INVENTORY_PAGE_PARAMETER = "page-two";
export const NEGATIVE_INVENTORY_PAGE_PARAMETER = "-1";
export const MULTIPLE_INVENTORY_PAGE_PARAMETERS = [
  "3",
  "5",
];
export const VALID_INVENTORY_PAGE_PARAMETER = "3";
export const VALID_INVENTORY_PAGE_INDEX = 3;

export const INVALID_INVENTORY_PAGE_PARAMETERS: InventoryPageParameter[] =
  [
    undefined,
    INVALID_INVENTORY_PAGE_PARAMETER,
    NEGATIVE_INVENTORY_PAGE_PARAMETER,
    "1.5",
    "Infinity",
    "NaN",
    "9007199254740992",
    "9007199254740991",
    [],
  ];
import type { InventoryPageParameter } from "../models/InventoryPageParameter.type";
