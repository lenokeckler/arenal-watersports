"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { BUTTON_TYPES } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { useUnitPhotoDelete } from "../hooks/useUnitPhotoDelete";
import type { UnitPhotoUploadProps } from "../models/UnitPhotoUploadProps.interface";
import { UNIT_PHOTO_DELETE_CLASS } from "../styles/UnitPhotos.styles";
import UnitPhotoDeleteSheet from "./UnitPhotoDeleteSheet";
import type { JSX } from "react";

const UnitPhotoDelete = (
  props: UnitPhotoUploadProps
): JSX.Element => {
  const {
    cancel,
    confirm,
    isConfirming,
    isDeleting,
    request,
  } = useUnitPhotoDelete(props);
  const angleLabel =
    UNIT_PHOTOS_COPY.ANGLE[props.slot.angle];

  return (
    <>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.BASE}
        className={UNIT_PHOTO_DELETE_CLASS}
        aria-label={UNIT_PHOTOS_COPY.DELETE_LABEL(
          angleLabel
        )}
        onClick={request}
      >
        <MaterialIcon name={MATERIAL_ICON_NAME.DELETE} />
      </Button>
      {isConfirming && (
        <UnitPhotoDeleteSheet
          angleLabel={angleLabel}
          isDeleting={isDeleting}
          onCancel={cancel}
          onConfirm={confirm}
        />
      )}
    </>
  );
};

export default UnitPhotoDelete;
