"use client";

import { useState } from "react";
import type { ExtraCardActionsViewModel } from "../models/ExtraCardActionsViewModel.interface";
import { useExtraCardReactivation } from "./useExtraCardReactivation";
import { useExtraCardRemoval } from "./useExtraCardRemoval";

export const useExtraCardActions =
  (): ExtraCardActionsViewModel => {
    const [pendingExtraIds, setPendingExtraIds] = useState<
      readonly string[]
    >([]);
    const removal = useExtraCardRemoval(setPendingExtraIds);
    const reactivation = useExtraCardReactivation(
      setPendingExtraIds
    );

    return { pendingExtraIds, ...removal, ...reactivation };
  };
