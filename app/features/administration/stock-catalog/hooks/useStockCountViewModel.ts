"use client";

import { useRouter } from "next/navigation";
import { STOCK_COUNT_VIEW_STATE } from "../constants/StockCountViewState.constants";
import type { StockCountViewModel } from "../models/StockCountViewModel.interface";
import type { StockCountViewModelProps } from "../models/StockCountViewModelProps.interface";
import { buildStockMovementCard } from "../utils/buildStockMovementCard";
import { resolveStockFormTotal } from "../utils/resolveStockFormTotal";
import { useStockCountFields } from "./useStockCountFields";
import { useStockCountSubmit } from "./useStockCountSubmit";

export const useStockCountViewModel = ({
  category,
  fetchFailed,
  levels,
  movements,
}: StockCountViewModelProps): StockCountViewModel => {
  const router = useRouter();
  const { markSaved, showValidationErrors, ...fields } =
    useStockCountFields({
      hasHistory: movements.length > 0,
      levels,
    });
  const { isSubmitting, onSubmit } = useStockCountSubmit({
    categoryId: category.id,
    context: {
      currentLevels: levels,
      hasExpiryAlert: category.hasExpiryAlert,
    },
    onSaved: markSaved,
    onValidationErrors: showValidationErrors,
    values: fields.values,
  });

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    ...fields,
    cards: movements.map(buildStockMovementCard),
    isSubmitting,
    onRetry,
    onSubmit,
    total: resolveStockFormTotal(fields.values),
    viewState: fetchFailed
      ? STOCK_COUNT_VIEW_STATE.ERROR
      : STOCK_COUNT_VIEW_STATE.READY,
  };
};
