"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useClockTimes } from "@/app/components/dispatch-board/hooks/useClockTimes";
import { useDispatchRadioChannel } from "@/app/components/dispatch-board/hooks/useDispatchRadioChannel";
import { buildDispatchWindow } from "@/app/components/dispatch-board/utils/buildDispatchWindow";
import { formatCostaRicaTime } from "@/app/components/dispatch-board/utils/formatCostaRicaTime";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { submitOpenDispatchUpdate } from "../actions/submitOpenDispatchUpdate";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitInfoViewModel } from "../models/CategoryUnitInfoViewModel.interface";
import type { UnitOccupancy } from "../models/UnitOccupancy.interface";

const UPDATE_ERROR_COPY: Record<string, string> = {
  [CATEGORY_UNIT_UPDATE_STATUS.ALREADY_CLOSED]:
    CATEGORY_UNITS_COPY.UPDATE_ALREADY_CLOSED,
  [CATEGORY_UNIT_UPDATE_STATUS.INVALID]:
    CATEGORY_UNITS_COPY.UPDATE_INVALID,
};

export const useCategoryUnitInfo = (
  occupancy: UnitOccupancy
): CategoryUnitInfoViewModel => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const timeState = useClockTimes(() => ({
    departureTime: formatCostaRicaTime(
      occupancy.dispatchedAt
    ),
    returnTime: formatCostaRicaTime(occupancy.returnsAt),
  }));
  const radio = useDispatchRadioChannel(
    occupancy.radioChannel === null
      ? STRING.Empty
      : String(occupancy.radioChannel)
  );
  const window = buildDispatchWindow({
    ...timeState.times,
    now: new Date(),
  });
  const canSave =
    timeState.hasValidTimes &&
    window !== null &&
    radio.isValid &&
    !isSaving;

  const handleSave = async (): Promise<void> => {
    if (!window || !canSave) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const { status } = await submitOpenDispatchUpdate({
        departureAt: window.departureAt,
        dispatchId: occupancy.dispatchId,
        radioChannel: radio.channel,
        returnsAt: window.returnsAt,
      });

      if (status === CATEGORY_UNIT_UPDATE_STATUS.UPDATED) {
        setIsEditing(false);
        router.refresh();
      } else {
        setErrorMessage(
          UPDATE_ERROR_COPY[status] ??
            CATEGORY_UNITS_COPY.UPDATE_ERROR
        );
      }
    } catch {
      setErrorMessage(CATEGORY_UNITS_COPY.UPDATE_ERROR);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    canSave,
    errorMessage,
    handleSave: () => {
      void handleSave();
    },
    handleToggleEditing: () => {
      setErrorMessage(null);
      setIsEditing((current) => !current);
    },
    isEditing,
    isSaving,
    radio,
    timeState,
  };
};
