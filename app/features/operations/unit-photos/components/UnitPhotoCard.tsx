import Image from "@/app/components/image/Image";
import Text from "@/app/components/text/Text";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import UnitPhotoUpload from "./UnitPhotoUpload";
import type { UnitPhotoCardProps } from "../models/UnitPhotoCardProps.interface";
import {
  UNIT_PHOTO_ANGLE_CLASS,
  UNIT_PHOTO_CLASS,
  UNIT_PHOTO_EMPTY_CLASS,
  UNIT_PHOTO_FRAME_CLASS,
  UNIT_PHOTO_IMAGE_CLASS,
} from "../styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotoCard = ({
  canManage,
  slot,
  unitId,
}: UnitPhotoCardProps): JSX.Element => {
  const angleLabel = UNIT_PHOTOS_COPY.ANGLE[slot.angle];

  return (
    <div className={UNIT_PHOTO_CLASS}>
      <Text className={UNIT_PHOTO_ANGLE_CLASS}>
        {angleLabel}
      </Text>
      <div className={UNIT_PHOTO_FRAME_CLASS}>
        {slot.url ? (
          <Image
            aria-hidden={false}
            alt={`${UNIT_PHOTOS_COPY.ALT_PREFIX}${angleLabel}`}
            className={UNIT_PHOTO_IMAGE_CLASS}
            fill
            priority={false}
            sizes={UNIT_PHOTOS_COPY.IMAGE_SIZES}
            src={slot.url}
            unoptimized
          />
        ) : (
          <Text className={UNIT_PHOTO_EMPTY_CLASS}>
            {UNIT_PHOTOS_COPY.NO_PHOTO}
          </Text>
        )}
      </div>
      {canManage && (
        <UnitPhotoUpload
          slot={slot}
          unitId={unitId}
        />
      )}
    </div>
  );
};

export default UnitPhotoCard;
