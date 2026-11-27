"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotoLargeViewProps } from "../models/UnitPhotoLargeViewProps.interface";
import {
  UNIT_PHOTO_LARGE_ACTIONS_CLASS,
  UNIT_PHOTO_LARGE_FRAME_CLASS,
  UNIT_PHOTO_LARGE_IMAGE_CLASS,
} from "../styles/UnitPhotos.styles";
import UnitPhotoImage from "./UnitPhotoImage";
import type { JSX } from "react";

const UnitPhotoLargeView = ({
  angleLabel,
  children,
  onClose,
  url,
}: UnitPhotoLargeViewProps): JSX.Element => (
  <ActionSheet
    title={angleLabel}
    onClose={onClose}
  >
    <div className={UNIT_PHOTO_LARGE_FRAME_CLASS}>
      <UnitPhotoImage
        angleLabel={angleLabel}
        className={UNIT_PHOTO_LARGE_IMAGE_CLASS}
        sizes={UNIT_PHOTOS_COPY.LARGE_IMAGE_SIZES}
        url={url}
      />
    </div>
    {children && (
      <div className={UNIT_PHOTO_LARGE_ACTIONS_CLASS}>
        {children}
      </div>
    )}
  </ActionSheet>
);

export default UnitPhotoLargeView;
