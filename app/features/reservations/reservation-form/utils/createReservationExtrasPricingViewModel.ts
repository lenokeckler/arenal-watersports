import type { NullableRef } from "@/app/types";
import type { ReservationExtrasPricingViewModel } from "../models/ReservationExtrasPricingViewModel.interface";
import type { ReservationExtrasPricingRequestState } from "../models/ReservationExtrasPricingRequestState.interface";
import type { ReservationExtrasViewModelResult } from "../models/ReservationExtrasViewModelResult.interface";

const hasCurrentResult = <Value>(
  result: NullableRef<
    ReservationExtrasViewModelResult<Value>
  >,
  requestKey: NullableRef<string>
): boolean => result?.key === requestKey;

export const createReservationExtrasPricingViewModel = (
  state: ReservationExtrasPricingRequestState,
  activeRequestKey: NullableRef<string>,
  retryPricing: () => void
): ReservationExtrasPricingViewModel => {
  const hasPricing = hasCurrentResult(
    state.pricing,
    activeRequestKey
  );
  const hasError = hasCurrentResult(
    state.error,
    activeRequestKey
  );
  return {
    isPricingLoading:
      activeRequestKey !== null && !hasPricing && !hasError,
    pricing: hasPricing
      ? (state.pricing?.value ?? null)
      : null,
    pricingError: hasError
      ? (state.error?.value ?? null)
      : null,
    retryPricing,
  };
};
