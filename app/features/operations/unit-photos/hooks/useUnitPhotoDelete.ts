"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/components/toast/utils/useToast";
import { STATUS } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { UNIT_PHOTO_NOTICE_MS } from "../constants/UnitPhotos.constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { UnitPhotoDeleteViewModel } from "../models/UnitPhotoDeleteViewModel.interface";
import type { UnitPhotoUploadProps } from "../models/UnitPhotoUploadProps.interface";
import { deleteUnitPhoto } from "../services/deleteUnitPhoto";

export const useUnitPhotoDelete = (
  props: UnitPhotoUploadProps
): UnitPhotoDeleteViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [isConfirming, setIsConfirming] = useState(false);

  const confirm = (): Promise<void> =>
    runLocked(async () => {
      try {
        const { isFileRemoved } =
          await deleteUnitPhoto(props);
        showToast(
          isFileRemoved ? STATUS.SUCCESS : STATUS.WARNING,
          isFileRemoved
            ? UNIT_PHOTOS_COPY.DELETED
            : UNIT_PHOTOS_COPY.DELETED_FILE_KEPT
        );
        router.refresh();
      } catch {
        showToast(
          STATUS.ERROR,
          UNIT_PHOTOS_COPY.ERROR_DELETE,
          UNIT_PHOTO_NOTICE_MS.ERROR
        );
      }
      setIsConfirming(false);
    });

  return {
    cancel: () => setIsConfirming(false),
    confirm,
    isConfirming,
    isDeleting: isSubmitting,
    request: () => setIsConfirming(true),
  };
};
