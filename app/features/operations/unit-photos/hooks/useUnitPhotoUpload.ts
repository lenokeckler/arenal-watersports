"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import type { NullableRef } from "@/app/types";
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
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const [savedMessage, setSavedMessage] =
    useState<NullableRef<string>>(null);

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    setSavedMessage(null);
    const invalidMessage = validatePhotoFile(file);

    if (invalidMessage) {
      setErrorMessage(invalidMessage);
      input.value = "";
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      await uploadUnitPhoto({
        angle: slot.angle,
        file,
        unitId,
      });
      setSavedMessage(UNIT_PHOTOS_COPY.SAVED);
      router.refresh();
    } catch {
      setErrorMessage(UNIT_PHOTOS_COPY.ERROR_UPLOAD);
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  };

  return {
    errorMessage,
    handleChange,
    isUploading,
    savedMessage,
  };
};
