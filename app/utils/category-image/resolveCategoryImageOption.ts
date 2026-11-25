import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import { resolveReservationEquipmentImage } from "@/app/components/reservation-calendar/utils/resolveReservationEquipmentImage";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { resolveCategoryImageUrl } from "./resolveCategoryImageUrl";

export const resolveCategoryImageOption = (
  imagePath: NullableRef<string>,
  categoryName: string
): NullableRef<ReservationEquipmentImageOption> => {
  const uploadedImageUrl =
    resolveCategoryImageUrl(imagePath);

  if (uploadedImageUrl) {
    return { alt: STRING.Empty, source: uploadedImageUrl };
  }

  return resolveReservationEquipmentImage(categoryName);
};
