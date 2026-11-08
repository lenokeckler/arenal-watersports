"use client";

import { useState } from "react";
import type { Nullable } from "@/app/types";
import type { ExtraCardActionsViewModel } from "../models/ExtraCardActionsViewModel.interface";
import { useExtraCardReactivation } from "./useExtraCardReactivation";
import { useExtraCardRemoval } from "./useExtraCardRemoval";

export const useExtraCardActions =
  (): ExtraCardActionsViewModel => {
    const [pendingExtraId, setPendingExtraId] =
      useState<Nullable<string>>(null);
    const removal = useExtraCardRemoval(setPendingExtraId);
    const reactivation = useExtraCardReactivation(
      setPendingExtraId
    );

    return { pendingExtraId, ...removal, ...reactivation };
  };
