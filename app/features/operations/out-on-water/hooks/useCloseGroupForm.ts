"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { formatCostaRicaTime } from "@/app/components/dispatch-board/utils/formatCostaRicaTime";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { submitGroupClosing } from "../actions/submitGroupClosing";
import { CLOSE_GROUP_STATUS } from "../constants/CloseGroup.constants";
import { CLOSE_GROUP_COPY } from "../constants/CloseGroupCopy.constants";
import type { CloseGroupDraft } from "../models/CloseGroupDraft.interface";
import type { CloseGroupForm } from "../models/CloseGroupForm.interface";
import type { CloseGroupFormInput } from "../models/CloseGroupFormInput.interface";
import { buildArrivalInstant } from "../utils/buildArrivalInstant";
import { buildReturnReadingRow } from "../utils/buildReturnReadingRow";
import { isArrivalAllowed } from "../utils/isArrivalAllowed";

const EMPTY_DRAFT: CloseGroupDraft = {
  cause: STRING.Empty,
  description: STRING.Empty,
  fuel: STRING.Empty,
  hasDamage: false,
  impact: STRING.Empty,
  maintenance: false,
  usage: STRING.Empty,
};

export const useCloseGroupForm = ({
  group,
  onClosed,
  units,
}: CloseGroupFormInput): CloseGroupForm => {
  const router = useRouter();
  const [arrivalTime, setArrivalTime] = useState(() =>
    formatCostaRicaTime(new Date())
  );
  const [drafts, setDrafts] = useState<
    Record<string, CloseGroupDraft>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);

  const now = new Date();
  const arrival = buildArrivalInstant(arrivalTime, now);
  const isArrivalValid =
    arrival !== null &&
    isArrivalAllowed(arrival, group.dispatchedAt, now);
  const rows = units.map((unit) =>
    buildReturnReadingRow(
      unit,
      drafts[unit.unitId] ?? EMPTY_DRAFT
    )
  );
  const canSubmit =
    isArrivalValid &&
    rows.every((row) => row.isComplete) &&
    !isSubmitting;

  const handleDraftChange = (
    unitId: string,
    change: Partial<CloseGroupDraft>
  ): void => {
    setErrorMessage(null);
    setDrafts((current) => ({
      ...current,
      [unitId]: {
        ...(current[unitId] ?? EMPTY_DRAFT),
        ...change,
      },
    }));
  };

  const handleArrivalChange = (value: string): void => {
    setErrorMessage(null);
    setArrivalTime(value);
  };

  const submit = async (): Promise<void> => {
    if (arrival === null || !canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { status } = await submitGroupClosing({
        arrivedAt: arrival.toISOString(),
        dispatchId: group.dispatchId,
        returns: rows.map((row) => ({
          damage: row.damage,
          fuel: row.fuelLevel,
          maintenance: row.draft.maintenance,
          unitId: row.unitId,
          usage: row.usageReading,
        })),
      });

      if (status === CLOSE_GROUP_STATUS.CLOSED) {
        router.refresh();
        onClosed();
      } else if (
        status === CLOSE_GROUP_STATUS.ALREADY_CLOSED
      ) {
        setErrorMessage(
          CLOSE_GROUP_COPY.SAVE_ERROR_ALREADY_CLOSED
        );
      } else if (
        status === CLOSE_GROUP_STATUS.INVALID_ARRIVAL
      ) {
        setErrorMessage(
          CLOSE_GROUP_COPY.SAVE_ERROR_ARRIVAL
        );
      } else {
        setErrorMessage(
          CLOSE_GROUP_COPY.SAVE_ERROR_RETURNS
        );
      }
    } catch {
      setErrorMessage(CLOSE_GROUP_COPY.SAVE_ERROR_GENERIC);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    arrivalError:
      arrivalTime !== STRING.Empty && !isArrivalValid
        ? CLOSE_GROUP_COPY.ARRIVAL_ERROR
        : null,
    arrivalTime,
    canSubmit,
    errorMessage,
    handleArrivalChange,
    handleDraftChange,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void submit();
    },
    isSubmitting,
    rows,
  };
};
