import { STRING } from "@/app/constants";
import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import { resolveReservationEquipmentImage } from "@/app/components/reservation-calendar/utils/resolveReservationEquipmentImage";
import type { NullableRef } from "@/app/types";
import { resolveCategoryImageUrl } from "@/app/utils/category-image/resolveCategoryImageUrl";
import type { BoardCard } from "../models/BoardCard.interface";

export const resolveBoardCardImage = (
  card: BoardCard
): NullableRef<ReservationEquipmentImageOption> => {
  const uploadedImageUrl = resolveCategoryImageUrl(
    card.imagePath
  );

  if (uploadedImageUrl) {
    return { alt: STRING.Empty, source: uploadedImageUrl };
  }

  return resolveReservationEquipmentImage(card.label);
};
