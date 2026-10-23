import { useEffect, useRef } from "react";
import type { NullableRef } from "@/app/types";
import { getReservationExtrasPricingAction } from "../actions/getReservationExtrasPricingAction";
import { RESERVATION_EXTRAS_REQUEST } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtrasPricingInput } from "../models/ReservationExtrasPricingInput.interface";
import type { ReservationExtrasPricingRequestController } from "../models/ReservationExtrasPricingRequestController.interface";

export const useReservationExtrasPricingRequestEffect = (
  input: NullableRef<ReservationExtrasPricingInput>,
  requestKey: NullableRef<string>,
  onResult: ReservationExtrasPricingRequestController["onResult"],
  onRequestError: ReservationExtrasPricingRequestController["onRequestError"]
): void => {
  const requestId = useRef(0);

  useEffect(() => {
    if (input === null || requestKey === null) {
      return undefined;
    }
    const activeRequestId =
      requestId.current +
      RESERVATION_EXTRAS_REQUEST.INCREMENT;
    requestId.current = activeRequestId;
    const loadPricing = async (): Promise<void> => {
      try {
        const result =
          await getReservationExtrasPricingAction(input);
        if (requestId.current === activeRequestId) {
          onResult(result);
        }
      } catch (error) {
        if (requestId.current === activeRequestId) {
          onRequestError(error);
        }
      }
    };
    void loadPricing();
    return () => {
      requestId.current +=
        RESERVATION_EXTRAS_REQUEST.INCREMENT;
    };
  }, [input, onRequestError, onResult, requestKey]);
};
