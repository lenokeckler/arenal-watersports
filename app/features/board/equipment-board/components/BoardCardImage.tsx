import { Image, MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { resolveReservationEquipmentImage } from "@/app/components/reservation-calendar/utils/resolveReservationEquipmentImage";
import { EQUIPMENT_BOARD_IMAGE } from "../constants/EquipmentBoard.constants";
import type { BoardCardImageProps } from "../models/BoardCardImageProps.interface";
import {
  BOARD_CARD_IMAGE_CLASS,
  BOARD_CARD_PLACEHOLDER_CLASS,
  BOARD_CARD_PLACEHOLDER_ICON_CLASS,
} from "../styles/BoardCard.styles";

const BoardCardImage = ({
  label,
}: BoardCardImageProps): React.JSX.Element => {
  const image = resolveReservationEquipmentImage(label);

  if (image === null) {
    return (
      <div className={BOARD_CARD_PLACEHOLDER_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.SAILING}
          className={BOARD_CARD_PLACEHOLDER_ICON_CLASS}
        />
      </div>
    );
  }

  return (
    <Image
      alt={image.alt}
      className={BOARD_CARD_IMAGE_CLASS}
      height={EQUIPMENT_BOARD_IMAGE.HEIGHT}
      sizes={EQUIPMENT_BOARD_IMAGE.SIZES}
      src={image.source}
      width={EQUIPMENT_BOARD_IMAGE.WIDTH}
      priority={false}
    />
  );
};

export default BoardCardImage;
