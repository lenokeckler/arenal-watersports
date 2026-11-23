import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import { resolveCategoryImageOption } from "@/app/utils/category-image/resolveCategoryImageOption";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";

export const resolveDispatchGroupImage = (
  group: DispatchSheetGroup
): NullableRef<ReservationEquipmentImageOption> =>
  resolveCategoryImageOption(
    group.imagePath,
    group.categoryName
  );
