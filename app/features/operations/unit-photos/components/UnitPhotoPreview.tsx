"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { useUnitPhotoPreviewViewModel } from "../hooks/useUnitPhotoPreviewViewModel";
import type { UnitPhotoPreviewProps } from "../models/UnitPhotoPreviewProps.interface";
import {
  UNIT_PHOTO_IMAGE_CLASS,
  UNIT_PHOTO_OPEN_CLASS,
} from "../styles/UnitPhotos.styles";
import UnitPhotoImage from "./UnitPhotoImage";
import UnitPhotoLargeView from "./UnitPhotoLargeView";
import type { JSX } from "react";

const UnitPhotoPreview = ({
  angleLabel,
  children,
  url,
}: UnitPhotoPreviewProps): JSX.Element => {
  const { close, isOpen, open } =
    useUnitPhotoPreviewViewModel();

  return (
    <>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.BASE}
        className={UNIT_PHOTO_OPEN_CLASS}
        aria-label={UNIT_PHOTOS_COPY.VIEW_LARGE(angleLabel)}
        onClick={open}
      >
        <UnitPhotoImage
          angleLabel={angleLabel}
          url={url}
          className={UNIT_PHOTO_IMAGE_CLASS}
          sizes={UNIT_PHOTOS_COPY.IMAGE_SIZES}
        />
      </Button>
      {isOpen && (
        <UnitPhotoLargeView
          angleLabel={angleLabel}
          onClose={close}
          url={url}
        >
          {children}
        </UnitPhotoLargeView>
      )}
    </>
  );
};

export default UnitPhotoPreview;
