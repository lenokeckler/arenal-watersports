import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Image from "@/app/components/image/Image";
import InlineText from "@/app/components/text/InlineText";
import { UNIT_PHOTO_LIST_COPY } from "../constants/UnitPhotoListCopy.constants";
import type { UnitPhotoListItemProps } from "../models/UnitPhotoListItemProps.interface";
import {
  UNIT_PHOTO_LIST_FRAME_CLASS,
  UNIT_PHOTO_LIST_IMAGE_CLASS,
} from "../styles/UnitPhotoList.styles";
import type { JSX } from "react";

const UnitPhotoListCover = ({
  item,
}: UnitPhotoListItemProps): JSX.Element => (
  <InlineText className={UNIT_PHOTO_LIST_FRAME_CLASS}>
    {item.coverUrl ? (
      <Image
        aria-hidden={false}
        alt={UNIT_PHOTO_LIST_COPY.COVER_ALT(item.code)}
        className={UNIT_PHOTO_LIST_IMAGE_CLASS}
        fill
        priority={false}
        sizes={UNIT_PHOTO_LIST_COPY.IMAGE_SIZES}
        src={item.coverUrl}
      />
    ) : (
      <MaterialIcon
        name={MATERIAL_ICON_NAME.PHOTO_CAMERA}
      />
    )}
  </InlineText>
);

export default UnitPhotoListCover;
