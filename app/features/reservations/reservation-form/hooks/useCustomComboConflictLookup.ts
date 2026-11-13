import { useEffect, useState } from "react";
import { STRING } from "@/app/constants";
import { EMPTY_CUSTOM_COMBO_CONFLICTS } from "../constants/CustomComboConflictLookup.constants";
import type { CustomComboConflictLookupOptions } from "../models/CustomComboConflictLookupOptions.interface";
import type { CustomComboConflictLookupState } from "../models/CustomComboConflictLookupState.interface";
import { loadCustomComboConflictLookup } from "../utils/loadCustomComboConflictLookup";

export const useCustomComboConflictLookup = ({
  request,
}: CustomComboConflictLookupOptions): CustomComboConflictLookupState => {
  const [lookup, setLookup] =
    useState<CustomComboConflictLookupState>({
      key: STRING.Empty,
      conflicts: EMPTY_CUSTOM_COMBO_CONFLICTS,
      hasError: false,
      isLoading: false,
    });

  useEffect(() => {
    if (!request.isValid) {
      return undefined;
    }
    let isCurrentRequest = true;
    void loadCustomComboConflictLookup(
      request,
      setLookup,
      () => isCurrentRequest
    );
    return () => {
      isCurrentRequest = false;
    };
  }, [request]);

  return lookup;
};
