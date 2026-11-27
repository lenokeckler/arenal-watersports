import { readPhotoUnits } from "@/app/services/equipment/readPhotoUnits";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { resolveCategoryImageOption } from "@/app/utils/category-image/resolveCategoryImageOption";
import type { UnitPhotoListData } from "../models/UnitPhotoListData.interface";
import type { UnitPhotoListProps } from "../models/UnitPhotoListProps.interface";
import { pagePhotoUnits } from "../utils/pagePhotoUnits";

export const getUnitPhotoList = async ({
  categoryParam,
  pageParam,
}: UnitPhotoListProps): Promise<UnitPhotoListData> => {
  const supabase = await getOperationsSupabaseClient();
  const { units, ...page } = pagePhotoUnits(
    await readPhotoUnits(supabase),
    categoryParam,
    pageParam
  );

  return {
    ...page,
    items: units.map((unit) => ({
      ...unit,
      coverUrl:
        resolveCategoryImageOption(
          unit.imagePath,
          unit.categoryName
        )?.source ?? null,
    })),
  };
};
