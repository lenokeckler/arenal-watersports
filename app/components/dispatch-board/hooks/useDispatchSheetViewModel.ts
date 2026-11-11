"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { submitDispatchGroup } from "../actions/submitDispatchGroup";
import { DISPATCH_GROUP_STATUS } from "../constants/DispatchSheet.constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchGroupSelection } from "../models/DispatchGroupSelection.interface";
import type { DispatchSheetViewModel } from "../models/DispatchSheetViewModel.interface";
import { useDispatchSheetData } from "./useDispatchSheetData";

interface DispatchSheetViewModelInput {
  initialCategoryId?: string;
  onDispatched: () => void;
  reservationId: string;
}

export const useDispatchSheetViewModel = ({
  initialCategoryId,
  onDispatched,
  reservationId,
}: DispatchSheetViewModelInput): DispatchSheetViewModel => {
  const { groups, phase, reload } =
    useDispatchSheetData(reservationId);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<NullableRef<string>>(
      initialCategoryId ?? null
    );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);

  const selectedGroup =
    groups.find(
      (group) => group.categoryId === selectedCategoryId
    ) ?? (groups.length === 1 ? groups[0] : null);

  const handleSelectGroup = (categoryId: string): void => {
    setErrorMessage(null);
    setSelectedCategoryId(categoryId);
  };

  const handleBack = (): void => {
    setErrorMessage(null);
    setSelectedCategoryId(null);
  };

  const handleSubmitGroup = async (
    selection: DispatchGroupSelection
  ): Promise<void> => {
    if (!selectedGroup) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { status } = await submitDispatchGroup({
        ...selection,
        categoryId: selectedGroup.categoryId,
        reservationId,
      });
      const remaining = await reload();

      if (status === DISPATCH_GROUP_STATUS.UNAVAILABLE) {
        setErrorMessage(
          DISPATCH_SHEET_COPY.UNITS_UNAVAILABLE
        );
      } else if (
        status === DISPATCH_GROUP_STATUS.INVALID_READINGS
      ) {
        setErrorMessage(
          DISPATCH_SHEET_COPY.READINGS_INVALID
        );
      } else if (remaining.length === 0) {
        onDispatched();
      } else {
        setSelectedCategoryId(null);
      }
    } catch {
      setErrorMessage(DISPATCH_SHEET_COPY.SUBMIT_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errorMessage,
    groups,
    handleBack,
    handleSelectGroup,
    handleSubmitGroup,
    isSubmitting,
    phase,
    selectedGroup,
  };
};
