"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { DispatchGroupFormViewModel } from "../models/DispatchGroupFormViewModel.interface";
import type { DispatchGroupSelection } from "../models/DispatchGroupSelection.interface";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import { addMinutesToClockTime } from "../utils/addMinutesToClockTime";
import { buildDispatchWindow } from "../utils/buildDispatchWindow";
import { buildInitialUnitSelection } from "../utils/buildInitialUnitSelection";
import { formatCostaRicaTime } from "../utils/formatCostaRicaTime";
import { getClockSpanMinutes } from "../utils/getClockSpanMinutes";
import { parseClockTime } from "../utils/parseClockTime";
import { useDispatchUnitReadings } from "./useDispatchUnitReadings";

interface DispatchGroupFormInput {
  group: DispatchSheetGroup;
  onSubmit: (selection: DispatchGroupSelection) => void;
  preselectedUnitIds?: string[];
}

const NO_PRESELECTED_UNITS: string[] = [];

const buildInitialTimes = (durationMinutes: number) => {
  const departureTime = formatCostaRicaTime(new Date());

  return {
    departureTime,
    returnTime: addMinutesToClockTime(
      departureTime,
      durationMinutes
    ),
  };
};

export const useDispatchGroupForm = ({
  group,
  onSubmit,
  preselectedUnitIds = NO_PRESELECTED_UNITS,
}: DispatchGroupFormInput): DispatchGroupFormViewModel => {
  const [times, setTimes] = useState(() =>
    buildInitialTimes(group.durationMinutes)
  );
  const [selectedUnitIds, setSelectedUnitIds] = useState<
    string[]
  >(() =>
    buildInitialUnitSelection(group, preselectedUnitIds)
  );

  const readings = useDispatchUnitReadings({
    group,
    selectedUnitIds,
  });
  const targetCount = group.isTrackedByUnit
    ? group.fixedUnitIds.length + group.requiredQuantity
    : 0;
  const departureMinutes = parseClockTime(
    times.departureTime
  );
  const returnMinutes = parseClockTime(times.returnTime);
  const hasValidTimes =
    departureMinutes !== null && returnMinutes !== null;
  const isNextDay =
    hasValidTimes && returnMinutes <= departureMinutes;
  const canSubmit =
    hasValidTimes &&
    selectedUnitIds.length === targetCount &&
    readings.areReadingsComplete;

  const handleToggleUnit = (unitId: string): void => {
    if (group.fixedUnitIds.includes(unitId)) {
      return;
    }

    setSelectedUnitIds((current) => {
      if (current.includes(unitId)) {
        return current.filter((id) => id !== unitId);
      }

      return current.length >= targetCount
        ? current
        : [...current, unitId];
    });
  };

  const handleDepartureChange: DispatchGroupFormViewModel["handleDepartureChange"] =
    (event) => {
      const departureTime = event.target.value;
      const span = getClockSpanMinutes(
        times.departureTime,
        times.returnTime
      );

      setTimes({
        departureTime,
        returnTime: Number.isNaN(span)
          ? times.returnTime
          : addMinutesToClockTime(departureTime, span),
      });
    };

  const handleReturnChange: DispatchGroupFormViewModel["handleReturnChange"] =
    (event) => {
      setTimes({
        ...times,
        returnTime: event.target.value,
      });
    };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    const window = buildDispatchWindow({
      ...times,
      now: new Date(),
    });

    if (!window || !canSubmit) {
      return;
    }

    onSubmit({
      ...window,
      readings: readings.buildReadings(),
      unitIds: selectedUnitIds,
    });
  };

  return {
    canSubmit,
    departureTime: times.departureTime,
    handleDepartureChange,
    handleReturnChange,
    handleSubmit,
    handleToggleUnit,
    isNextDay,
    readings,
    returnTime: times.returnTime,
    selectedUnitIds,
    targetCount,
  };
};
