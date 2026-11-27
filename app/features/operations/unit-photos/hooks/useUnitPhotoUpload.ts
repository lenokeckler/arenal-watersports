"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import { useToast } from "@/app/components/toast/utils/useToast";
import { STATUS } from "@/app/constants";
import { UNIT_PHOTO_NOTICE_MS } from "../constants/UnitPhotos.constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotoUpload } from "../models/UnitPhotoUpload.interface";
import type { UnitPhotoUploadProps } from "../models/UnitPhotoUploadProps.interface";
import { uploadUnitPhoto } from "../services/uploadUnitPhoto";
import { validatePhotoFile } from "../utils/validatePhotoFile";

export const useUnitPhotoUpload = ({
  slot,
  unitId,
}: UnitPhotoUploadProps): UnitPhotoUpload => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const showError = (message: string): void =>
    showToast(
      STATUS.ERROR,
      message,
      UNIT_PHOTO_NOTICE_MS.ERROR
    );

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const invalidMessage = validatePhotoFile(file);

    if (invalidMessage) {
      showError(invalidMessage);
      input.value = "";
      return;
    }

    setIsUploading(true);

    try {
      await uploadUnitPhoto({
        angle: slot.angle,
        file,
        unitId,
      });
      showToast(STATUS.SUCCESS, UNIT_PHOTOS_COPY.SAVED);
      router.refresh();
    } catch {
      showError(UNIT_PHOTOS_COPY.ERROR_UPLOAD);
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  };

  return { handleChange, isUploading };
};
