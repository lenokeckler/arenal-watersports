import {
  Button,
  Image,
  MaterialIcon,
  Text,
} from "@/app/components";
import { BUTTON, STRING } from "@/app/constants";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { resolveReservationEquipmentImage } from "@/app/components/reservation-calendar/utils/resolveReservationEquipmentImage";
import { RESERVATION_FORM_CATEGORY_IMAGE_SIZE } from "../constants/ReservationFormUi.constants";
import type { ReservationCategoryPreviewProps } from "../models/ReservationCategoryPreviewProps.interface";
import {
  RESERVATION_FORM_CATEGORY_IMAGE_CLASS,
  RESERVATION_FORM_CATEGORY_NAME_CLASS,
  RESERVATION_FORM_CATEGORY_SELECTED_ICON_CLASS,
  resolveReservationCategoryOptionClassName,
} from "../styles/ReservationFormView.styles";

export const ReservationCategoryPreview = ({
  category,
  isSelected,
  onSelect,
}: ReservationCategoryPreviewProps): React.JSX.Element => {
  const image = resolveReservationEquipmentImage(
    category.name
  );
  return (
    <Button
      type="button"
      variant={BUTTON.BASE}
      aria-pressed={isSelected}
      className={resolveReservationCategoryOptionClassName(
        isSelected
      )}
      onClick={() => onSelect(category.id)}
    >
      {isSelected ? (
        <MaterialIcon
          name={MATERIAL_ICON_NAME.CHECK_CIRCLE}
          className={
            RESERVATION_FORM_CATEGORY_SELECTED_ICON_CLASS
          }
        />
      ) : null}
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
      <Text
        className={RESERVATION_FORM_CATEGORY_NAME_CLASS}
      >
        {category.name}
      </Text>
    </Button>
  );
};
