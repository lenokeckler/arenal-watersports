import { Image, Text } from "@/app/components";
import { STRING } from "@/app/constants";
import type { ReservationEquipmentImageProps } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageProps.interface";
import { resolveReservationEquipmentImage } from "@/app/components/reservation-calendar/utils/resolveReservationEquipmentImage";
import { RESERVATION_FORM_CATEGORY_IMAGE_SIZE } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_CATEGORY_IMAGE_CLASS } from "../styles/ReservationFormView.styles";

export const ReservationCategoryPreview = ({
  categoryName,
}: ReservationEquipmentImageProps): React.JSX.Element => {
  const image =
    resolveReservationEquipmentImage(categoryName);
  return (
    <div>
      {image === null ? null : (
        <Image
          alt={STRING.Empty}
          className={RESERVATION_FORM_CATEGORY_IMAGE_CLASS}
          height={
            RESERVATION_FORM_CATEGORY_IMAGE_SIZE.HEIGHT
          }
          src={image.source}
          width={RESERVATION_FORM_CATEGORY_IMAGE_SIZE.WIDTH}
          priority={false}
        />
      )}
      <Text>{categoryName}</Text>
    </div>
  );
};
