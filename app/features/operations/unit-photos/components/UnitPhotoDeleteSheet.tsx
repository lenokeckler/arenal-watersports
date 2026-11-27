"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import { BUTTON_TYPES } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotoDeleteSheetProps } from "../models/UnitPhotoDeleteSheetProps.interface";
import {
  UNIT_PHOTO_CONFIRM_ACTIONS_CLASS,
  UNIT_PHOTO_CONFIRM_CANCEL_CLASS,
  UNIT_PHOTO_CONFIRM_DELETE_CLASS,
  UNIT_PHOTO_CONFIRM_TEXT_CLASS,
} from "../styles/UnitPhotos.styles";
import type { JSX } from "react";

const UnitPhotoDeleteSheet = ({
  angleLabel,
  isDeleting,
  onCancel,
  onConfirm,
}: UnitPhotoDeleteSheetProps): JSX.Element => (
  <ActionSheet
    title={UNIT_PHOTOS_COPY.CONFIRM_TITLE}
    onClose={onCancel}
  >
    <Text className={UNIT_PHOTO_CONFIRM_TEXT_CLASS}>
      {UNIT_PHOTOS_COPY.CONFIRM_BODY(angleLabel)}
    </Text>
    <div className={UNIT_PHOTO_CONFIRM_ACTIONS_CLASS}>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.BASE}
        className={UNIT_PHOTO_CONFIRM_CANCEL_CLASS}
        disabled={isDeleting}
        onClick={onCancel}
      >
        {UNIT_PHOTOS_COPY.CANCEL}
      </Button>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.BASE}
        className={UNIT_PHOTO_CONFIRM_DELETE_CLASS}
        disabled={isDeleting}
        onClick={onConfirm}
      >
        {isDeleting
          ? UNIT_PHOTOS_COPY.DELETING
          : UNIT_PHOTOS_COPY.DELETE}
      </Button>
    </div>
  </ActionSheet>
);

export default UnitPhotoDeleteSheet;
