"use client";

import type { FormEvent } from "react";
import type { DispatchGroupFormViewModel } from "../models/DispatchGroupFormViewModel.interface";
import type { DispatchGroupSelection } from "../models/DispatchGroupSelection.interface";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import { buildDispatchWindow } from "../utils/buildDispatchWindow";
import { useDispatchRadioChannel } from "./useDispatchRadioChannel";
import { useDispatchTimes } from "./useDispatchTimes";
import { useDispatchUnitFuel } from "./useDispatchUnitFuel";
import { useDispatchUnitSelection } from "./useDispatchUnitSelection";

interface DispatchGroupFormInput {
  group: DispatchSheetGroup;
  onSubmit: (selection: DispatchGroupSelection) => void;
  preselectedUnitIds?: string[];
}

const NO_PRESELECTED_UNITS: string[] = [];

export const useDispatchGroupForm = ({
  group,
  onSubmit,
  preselectedUnitIds = NO_PRESELECTED_UNITS,
}: DispatchGroupFormInput): DispatchGroupFormViewModel => {
  const timeState = useDispatchTimes(group.durationMinutes);
  const selection = useDispatchUnitSelection({
    group,
    preselectedUnitIds,
  });
  const fuel = useDispatchUnitFuel({
    group,
    selectedUnitIds: selection.selectedUnitIds,
  });
  const radio = useDispatchRadioChannel();
  const canSubmit =
    timeState.hasValidTimes &&
    selection.isSelectionComplete &&
    fuel.areLevelsReady &&
    radio.isValid;

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    const window = buildDispatchWindow({
      ...timeState.times,
      now: new Date(),
    });

    if (!window || !canSubmit) {
      return;
    }

    onSubmit({
      ...window,
      radioChannel: radio.channel,
      readings: fuel.buildReadings(),
      unitIds: selection.selectedUnitIds,
    });
  };

  return {
    canSubmit,
    fuel,
    handleSubmit,
    radio,
    selection,
    timeState,
  };
};
