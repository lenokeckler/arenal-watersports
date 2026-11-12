"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import {
  RESERVATION_SPLIT_FIELD_ID,
  RESERVATION_SPLIT_FOCUS,
} from "../constants/ReservationSplitUi.constants";
import type { ReservationSplitDepartureFocus } from "../models/ReservationSplitDepartureFocus.interface";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import type { ReservationSplitFocusTarget } from "../models/ReservationSplitFocusTarget.interface";

export const useReservationSplitDepartureFocus = (
  drafts: ReservationSplitDraft[]
): ReservationSplitDepartureFocus => {
  const [target, moveFocus] =
    useState<NullableRef<ReservationSplitFocusTarget>>(
      null
    );

  const focusHeading = useEffectEvent((index: number) => {
    const draft = drafts[index];
    const heading = draft
      ? document.getElementById(
          `${RESERVATION_SPLIT_FIELD_ID.HEADING_PREFIX}${draft.key}`
        )
      : null;
    if (!heading) {
      return;
    }
    heading.focus();
    heading.scrollIntoView({
      block: RESERVATION_SPLIT_FOCUS.SCROLL_BLOCK,
    });
  });

  useEffect(() => {
    if (target) {
      focusHeading(target.index);
    }
  }, [target]);

  return {
    announcement: target?.message ?? STRING.Empty,
    moveFocus,
  };
};
