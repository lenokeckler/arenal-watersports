import type { BoardCategoryIdentity } from "../models/BoardCategoryIdentity.interface";

export const BOARD_GROUP_NAME = {
  BLANK: "   ",
  KAYAK: "Kayak",
  KAYAK_LOWER: "kayak",
} as const;

export const DOUBLE_KAYAK: BoardCategoryIdentity = {
  id: "kayak-double",
  name: "Kayak doble",
};

export const INDIVIDUAL_KAYAK: BoardCategoryIdentity = {
  id: "kayak-individual",
  name: "Kayak individual",
};

export const ACCENTED_CATEGORY: BoardCategoryIdentity = {
  id: "accented",
  name: "Árbol",
};

export const PLAIN_CATEGORY: BoardCategoryIdentity = {
  id: "plain",
  name: "Bote",
};

export const SAME_NAME_LOW_ID: BoardCategoryIdentity = {
  id: "a-id",
  name: "Kayak",
};

export const SAME_NAME_HIGH_ID: BoardCategoryIdentity = {
  id: "b-id",
  name: "Kayak",
};
