"use client";

import { useState } from "react";
import type { UnitPhotoPreviewViewModel } from "../models/UnitPhotoPreviewViewModel.interface";

export const useUnitPhotoPreviewViewModel =
  (): UnitPhotoPreviewViewModel => {
    const [isOpen, setIsOpen] = useState(false);

    return {
      close: () => setIsOpen(false),
      isOpen,
      open: () => setIsOpen(true),
    };
  };
