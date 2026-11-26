export const COMBO_ITEM_QUANTITY_PATTERN = /^[1-9]\d*$/;

export const COMBO_ITEM_QUANTITY_STEP = {
  DECREASE: -1,
  INCREASE: 1,
  MIN: 1,
} as const;
