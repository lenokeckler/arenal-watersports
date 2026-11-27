import type { PhotoUnit } from "@/app/services/equipment/models/PhotoUnit.interface";
import type { NullableUndefined } from "@/app/types";
import { UNIT_PHOTO_LIST } from "../constants/UnitPhotoList.constants";
import type { UnitPhotoCategory } from "../models/UnitPhotoCategory.interface";

const listCategories = (
  units: PhotoUnit[]
): UnitPhotoCategory[] =>
  [
    ...new Map(
      units.map((unit) => [
        unit.categoryId,
        unit.categoryName,
      ])
    ),
  ]
    .map(([id, name]) => ({ id, name }))
    .sort((first, second) =>
      first.name.localeCompare(second.name)
    );

export const pagePhotoUnits = (
  units: PhotoUnit[],
  categoryParam: NullableUndefined<string | string[]>,
  pageParam: NullableUndefined<string | string[]>
) => {
  const categories = listCategories(units);
  const categoryId =
    categories.find(
      (category) => category.id === categoryParam
    )?.id ?? null;
  const matching = categoryId
    ? units.filter((unit) => unit.categoryId === categoryId)
    : units;
  const pageCount = Math.max(
    Math.ceil(matching.length / UNIT_PHOTO_LIST.PAGE_SIZE),
    UNIT_PHOTO_LIST.FIRST_PAGE
  );
  const requested = Number(pageParam);
  const page =
    Number.isInteger(requested) &&
    requested >= UNIT_PHOTO_LIST.FIRST_PAGE &&
    requested <= pageCount
      ? requested
      : UNIT_PHOTO_LIST.FIRST_PAGE;
  const start = (page - 1) * UNIT_PHOTO_LIST.PAGE_SIZE;

  return {
    categories,
    categoryId,
    page,
    pageCount,
    units: matching.slice(
      start,
      start + UNIT_PHOTO_LIST.PAGE_SIZE
    ),
  };
};
