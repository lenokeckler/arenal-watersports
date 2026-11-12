import type {
  EquipmentHoursCategory,
  EquipmentHoursUnit,
} from "../models/EquipmentHours.interface";

interface EquipmentHoursRow extends EquipmentHoursUnit {
  categoryId: string;
  categoryName: string;
}

export const groupEquipmentHours = (
  rows: EquipmentHoursRow[]
): EquipmentHoursCategory[] => {
  const categories = new Map<
    string,
    EquipmentHoursCategory
  >();

  for (const {
    categoryId,
    categoryName,
    ...unit
  } of rows) {
    const category = categories.get(categoryId) ?? {
      categoryId,
      name: categoryName,
      units: [],
    };
    category.units.push(unit);
    categories.set(categoryId, category);
  }

  return [...categories.values()]
    .map((category) => ({
      ...category,
      units: [...category.units].sort(
        (first, second) =>
          second.hours - first.hours ||
          first.code.localeCompare(second.code)
      ),
    }))
    .sort((first, second) =>
      first.name.localeCompare(second.name)
    );
};
