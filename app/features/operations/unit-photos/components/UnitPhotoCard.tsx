import Text from "@/app/components/text/Text";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import UnitPhotoPreview from "./UnitPhotoPreview";
import UnitPhotoUpload from "./UnitPhotoUpload";
import type { UnitPhotoCardProps } from "../models/UnitPhotoCardProps.interface";
import {
  UNIT_PHOTO_ANGLE_CLASS,
  UNIT_PHOTO_CLASS,
  UNIT_PHOTO_EMPTY_CLASS,
  UNIT_PHOTO_FRAME_CLASS,
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
      {canManage ? (
        <UnitPhotoUpload
          slot={slot}
          unitId={unitId}
        />
      ) : (
        <div className={UNIT_PHOTO_FRAME_CLASS}>
          {slot.url ? (
            <UnitPhotoPreview
              angleLabel={angleLabel}
              url={slot.url}
            />
          ) : (
            <Text className={UNIT_PHOTO_EMPTY_CLASS}>
              {UNIT_PHOTOS_COPY.NO_PHOTO}
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitPhotoCard;
