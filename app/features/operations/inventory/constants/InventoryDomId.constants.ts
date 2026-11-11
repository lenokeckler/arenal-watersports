export const INVENTORY_DOM_ID = {
  CATEGORIES: "inventory-categories",
  CATEGORY_UNITS: (categoryId: string) =>
    `${categoryId}-inventory-units`,
} as const;
