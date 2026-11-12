"use client";

import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { UNIT_PHOTO_UPLOAD } from "../constants/UnitPhotos.constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { useUnitPhotoUpload } from "../hooks/useUnitPhotoUpload";
import type { UnitPhotoUploadProps } from "../models/UnitPhotoUploadProps.interface";
import {
  UNIT_PHOTO_ERROR_CLASS,
  UNIT_PHOTO_INPUT_CLASS,
  UNIT_PHOTO_NOTE_CLASS,
  UNIT_PHOTO_UPLOAD_CLASS,
} from "../styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotoUpload = ({
  slot,
  unitId,
}: UnitPhotoUploadProps): JSX.Element => {
  const {
    errorMessage,
    handleChange,
    isUploading,
    savedMessage,
  } = useUnitPhotoUpload({ slot, unitId });
  const actionLabel = slot.url
    ? UNIT_PHOTOS_COPY.REPLACE
    : UNIT_PHOTOS_COPY.UPLOAD;
  const angleLabel = UNIT_PHOTOS_COPY.ANGLE[slot.angle];

  return (
    <>
      <label className={UNIT_PHOTO_UPLOAD_CLASS}>
        {isUploading
          ? UNIT_PHOTOS_COPY.UPLOADING
          : actionLabel}
        <input
          accept={UNIT_PHOTO_UPLOAD.ACCEPT}
          aria-label={`${actionLabel}: ${angleLabel}`}
          className={UNIT_PHOTO_INPUT_CLASS}
          disabled={isUploading}
          onChange={handleChange}
          type="file"
        />
      </label>
      {errorMessage && (
        <Text
          className={UNIT_PHOTO_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {errorMessage}
        </Text>
      )}
      {savedMessage && (
        <Text
          className={UNIT_PHOTO_NOTE_CLASS}
          role={ARIA_ROLE.STATUS}
        >
          {savedMessage}
        </Text>
      )}
    </>
  );
};

export default UnitPhotoUpload;
