"use client";

import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import { INPUT_TYPES } from "@/app/constants";
import { UNIT_PHOTO_UPLOAD } from "../constants/UnitPhotos.constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { useUnitPhotoUpload } from "../hooks/useUnitPhotoUpload";
import type { UnitPhotoUploadProps } from "../models/UnitPhotoUploadProps.interface";
import {
  UNIT_PHOTO_INPUT_CLASS,
  UNIT_PHOTO_PICK_ICON_CLASS,
  resolveUnitPhotoPickerClass,
} from "../styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotoPicker = (
  props: UnitPhotoUploadProps
): JSX.Element => {
  const { handleChange, isUploading } =
    useUnitPhotoUpload(props);
  const hasPhoto = Boolean(props.slot.url);
  const actionLabel = hasPhoto
    ? UNIT_PHOTOS_COPY.REPLACE
    : UNIT_PHOTOS_COPY.UPLOAD;

  return (
    <label
      className={resolveUnitPhotoPickerClass(hasPhoto)}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.PHOTO_CAMERA}
        className={UNIT_PHOTO_PICK_ICON_CLASS}
      />
      <InlineText>
        {isUploading
          ? UNIT_PHOTOS_COPY.UPLOADING
          : actionLabel}
      </InlineText>
      <input
        accept={UNIT_PHOTO_UPLOAD.ACCEPT}
        aria-label={`${actionLabel}: ${UNIT_PHOTOS_COPY.ANGLE[props.slot.angle]}`}
        className={UNIT_PHOTO_INPUT_CLASS}
        disabled={isUploading}
        onChange={handleChange}
        type={INPUT_TYPES.FILE}
      />
    </label>
  );
};

export default UnitPhotoPicker;
