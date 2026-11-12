"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CategoryDispatchReservation } from "@/app/components/dispatch-board/models/CategoryDispatchReservation.interface";
import type { NullableRef } from "@/app/types";
import { CATEGORY_UNITS_DISPATCH_STEP } from "../constants/CategoryUnits.constants";
import type { CategoryUnitsDispatchStep } from "../models/CategoryUnitsDispatchStep.type";
import type { CategoryUnitsDispatchViewModel } from "../models/CategoryUnitsDispatchViewModel.interface";

export const useCategoryUnitsDispatch =
  (): CategoryUnitsDispatchViewModel => {
    const router = useRouter();
    const [selectedUnitIds, setSelectedUnitIds] = useState<
      string[]
    >([]);
    const [step, setStep] =
      useState<CategoryUnitsDispatchStep>(
        CATEGORY_UNITS_DISPATCH_STEP.BROWSING
      );
    const [chosenReservation, setChosenReservation] =
      useState<NullableRef<CategoryDispatchReservation>>(
        null
      );

    const handleToggleUnit = (unitId: string): void => {
      setSelectedUnitIds((current) =>
        current.includes(unitId)
          ? current.filter((id) => id !== unitId)
          : [...current, unitId]
      );
    };

    const handleCancel = (): void => {
      setSelectedUnitIds([]);
    };

    const handleOpenPicker = (): void => {
      setStep(CATEGORY_UNITS_DISPATCH_STEP.PICKING);
    };

    const handleClosePicker = (): void => {
      setStep(CATEGORY_UNITS_DISPATCH_STEP.BROWSING);
    };

    const handleChooseReservation = (
      reservation: CategoryDispatchReservation
    ): void => {
      setChosenReservation(reservation);
      setStep(CATEGORY_UNITS_DISPATCH_STEP.DISPATCHING);
    };

    const handleCloseSheet = (): void => {
      setChosenReservation(null);
      setSelectedUnitIds([]);
      setStep(CATEGORY_UNITS_DISPATCH_STEP.BROWSING);
      router.refresh();
    };

    return {
      chosenReservation,
      handleCancel,
      handleChooseReservation,
      handleClosePicker,
      handleCloseSheet,
      handleOpenPicker,
      handleToggleUnit,
      selectedUnitIds,
      step,
    };
  };
