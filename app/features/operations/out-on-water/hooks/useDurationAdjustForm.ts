"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { NullableRef } from "@/app/types";
import { submitDurationAdjustment } from "../actions/submitDurationAdjustment";
import { ADJUST_DURATION_STATUS } from "../constants/OutOnWater.constants";
import { DURATION_ADJUST_COPY } from "../constants/OutOnWaterCopy.constants";
import type { DurationAdjustForm } from "../models/DurationAdjustForm.interface";
import type { DurationAdjustSheetProps } from "../models/DurationAdjustSheetProps.interface";
import { applyDurationDelta } from "../utils/applyDurationDelta";
import { parseDurationMinutes } from "../utils/parseDurationMinutes";

export const useDurationAdjustForm = ({
  group,
  onClose,
}: DurationAdjustSheetProps): DurationAdjustForm => {
  const router = useRouter();
  const [minutesText, setMinutesText] = useState(
    String(group.durationMinutes)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);

  const minutes = parseDurationMinutes(minutesText);
  const fieldError =
    minutes === null
      ? DURATION_ADJUST_COPY.ERROR_FIELD
      : null;
  const canSubmit =
    minutes !== null &&
    minutes !== group.durationMinutes &&
    !isSubmitting;

  const handleChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ): void => {
    setErrorMessage(null);
    setMinutesText(event.target.value);
  };

  const handleDelta = (delta: number): void => {
    setErrorMessage(null);
    setMinutesText(
      String(
        applyDurationDelta(
          minutes ?? group.durationMinutes,
          delta
        )
      )
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (minutes === null || !canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { status } = await submitDurationAdjustment({
        dispatchId: group.dispatchId,
        durationMinutes: minutes,
      });

      if (status === ADJUST_DURATION_STATUS.ADJUSTED) {
        router.refresh();
        onClose();
      } else if (
        status === ADJUST_DURATION_STATUS.ALREADY_CLOSED
      ) {
        setErrorMessage(DURATION_ADJUST_COPY.ERROR_CLOSED);
      } else {
        setErrorMessage(DURATION_ADJUST_COPY.ERROR_INVALID);
      }
    } catch {
      setErrorMessage(DURATION_ADJUST_COPY.ERROR_GENERIC);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    canSubmit,
    errorMessage,
    fieldError: minutesText === "" ? null : fieldError,
    handleChange,
    handleDelta,
    handleSubmit: (event) => {
      void handleSubmit(event);
    },
    isSubmitting,
    minutesText,
  };
};
