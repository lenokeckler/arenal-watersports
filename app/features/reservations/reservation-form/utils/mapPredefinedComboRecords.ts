import type { NullableUndefined } from "@/app/types";
import {
  PREDEFINED_COMBO_AUDIENCE,
  PREDEFINED_COMBO_CURRENCY,
  PREDEFINED_COMBO_STATUS,
} from "../constants/PredefinedCombo.constants";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import type { ReservationPredefinedComboItem } from "../models/ReservationPredefinedComboItem.interface";
import type {
  PredefinedComboCategoryRecord,
  PredefinedComboItemRecord,
  PredefinedComboQueryRecords,
  PredefinedComboRecord,
} from "../models/PredefinedComboQueryRecords.interface";

const getPackagePrice = (
  combo: PredefinedComboRecord
): NullableUndefined<number> => {
  if (
    combo.audience === PREDEFINED_COMBO_AUDIENCE.NATIONAL
  ) {
    if (
      typeof combo.package_price_crc === "number" &&
      Number.isFinite(combo.package_price_crc) &&
      combo.package_price_crc > 0 &&
      combo.package_price_usd === null
    ) {
      return combo.package_price_crc;
    }
    return undefined;
  }

  if (
    combo.audience === PREDEFINED_COMBO_AUDIENCE.FOREIGN &&
    typeof combo.package_price_usd === "number" &&
    Number.isFinite(combo.package_price_usd) &&
    combo.package_price_usd > 0 &&
    combo.package_price_crc === null
  ) {
    return combo.package_price_usd;
  }
  return undefined;
};

const getComboCurrency = (
  audience: PredefinedComboRecord["audience"]
): NullableUndefined<
  ReservationPredefinedCombo["currency"]
> => {
  if (audience === PREDEFINED_COMBO_AUDIENCE.NATIONAL) {
    return PREDEFINED_COMBO_CURRENCY.CRC;
  }
  if (audience === PREDEFINED_COMBO_AUDIENCE.FOREIGN) {
    return PREDEFINED_COMBO_CURRENCY.USD;
  }
  return undefined;
};

const mapComboItems = (
  comboItems: PredefinedComboItemRecord[],
  categoriesById: Map<string, PredefinedComboCategoryRecord>
): NullableUndefined<ReservationPredefinedComboItem[]> => {
  if (comboItems.length === 0) {
    return undefined;
  }

  const mappedItems: ReservationPredefinedComboItem[] = [];
  for (const item of comboItems) {
    const category = categoriesById.get(item.category_id);
    if (
      !category ||
      category.status !== PREDEFINED_COMBO_STATUS.ACTIVE ||
      !category.is_reservable ||
      !category.units_are_interchangeable ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      return undefined;
    }
    mappedItems.push({
      categoryId: category.id,
      categoryName: category.name,
      quantity: item.quantity,
    });
  }
  return mappedItems;
};

const mapCombo = (
  combo: PredefinedComboRecord,
  comboItems: PredefinedComboItemRecord[],
  categoriesById: Map<string, PredefinedComboCategoryRecord>
): NullableUndefined<ReservationPredefinedCombo> => {
  if (combo.status !== PREDEFINED_COMBO_STATUS.ACTIVE) {
    return undefined;
  }
  const packagePrice = getPackagePrice(combo);
  const currency = getComboCurrency(combo.audience);
  const items = mapComboItems(comboItems, categoriesById);
  if (packagePrice === undefined || !currency || !items) {
    return undefined;
  }
  return {
    audience: combo.audience,
    currency,
    id: combo.id,
    items,
    name: combo.name,
    packagePrice,
  };
};

export const mapPredefinedComboRecords = (
  records: PredefinedComboQueryRecords
): ReservationPredefinedCombo[] => {
  const categoriesById = new Map(
    records.categories.map((category) => [
      category.id,
      category,
    ])
  );
  const comboItemsById = new Map<
    string,
    PredefinedComboItemRecord[]
  >();
  for (const comboItem of records.comboItems) {
    const comboItems =
      comboItemsById.get(comboItem.combo_id) ?? [];
    comboItems.push(comboItem);
    comboItemsById.set(comboItem.combo_id, comboItems);
  }
  return records.combos.flatMap((combo) => {
    const mappedCombo = mapCombo(
      combo,
      comboItemsById.get(combo.id) ?? [],
      categoriesById
    );
    return mappedCombo ? [mappedCombo] : [];
  });
};
