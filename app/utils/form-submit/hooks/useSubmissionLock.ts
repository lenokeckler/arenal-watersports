"use client";

import { useRef, useState } from "react";
import type { SubmissionLock } from "../models/SubmissionLock.interface";

export const useSubmissionLock = (): SubmissionLock => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const runLocked = async (
    task: () => Promise<void>
  ): Promise<void> => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      await task();
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, runLocked };
};
