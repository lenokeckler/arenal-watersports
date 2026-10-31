import { Image } from "@/app/components";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EQUIPMENT_IMAGE_DIMENSION } from "../constants/ReservationCalendarEquipmentImage.constants";
import type { ReservationEquipmentImageProps } from "../models/ReservationEquipmentImageProps.interface";
import { resolveReservationEquipmentImage } from "../utils/resolveReservationEquipmentImage";
import { RESERVATION_EQUIPMENT_IMAGE_CLASS } from "../styles/ReservationCalendar.styles";

export const ReservationEquipmentImage = ({
  categoryName,
  className = RESERVATION_EQUIPMENT_IMAGE_CLASS,
}: ReservationEquipmentImageProps): NullableRef<React.JSX.Element> => {
  const image =
    resolveReservationEquipmentImage(categoryName);

  if (image === null) {
    return null;
  }

  return (
    <Image
      alt={image.alt}
      className={className}
      height={RESERVATION_EQUIPMENT_IMAGE_DIMENSION}
      src={image.source}
      width={RESERVATION_EQUIPMENT_IMAGE_DIMENSION}
      priority={false}
    />
  );
};
