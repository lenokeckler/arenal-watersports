"use client";

import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotoUploadProps } from "../models/UnitPhotoUploadProps.interface";
import { UNIT_PHOTO_FRAME_CLASS } from "../styles/UnitPhotos.styles";
import UnitPhotoDelete from "./UnitPhotoDelete";
import UnitPhotoPicker from "./UnitPhotoPicker";
import UnitPhotoPreview from "./UnitPhotoPreview";
import type { JSX } from "react";

const UnitPhotoUpload = ({
  slot,
  unitId,
}: UnitPhotoUploadProps): JSX.Element => {
  const picker = (
    <UnitPhotoPicker
      slot={slot}
      unitId={unitId}
    />
  );

  return (
    <div className={UNIT_PHOTO_FRAME_CLASS}>
      {slot.url ? (
        <UnitPhotoPreview
          angleLabel={UNIT_PHOTOS_COPY.ANGLE[slot.angle]}
          url={slot.url}
        >
          {picker}
          <UnitPhotoDelete
            slot={slot}
            unitId={unitId}
          />
        </UnitPhotoPreview>
      ) : (
        picker
      )}
    </div>
  );
};

export default UnitPhotoUpload;
