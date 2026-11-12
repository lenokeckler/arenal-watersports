import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRAS_REQUEST } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtrasRequestGeneration } from "../models/ReservationExtrasRequestGeneration.interface";

export const useReservationExtrasRequestKey = (
  requestKey: NullableRef<string>
): NullableRef<string> => {
  const [requestGeneration, setRequestGeneration] =
    useState<ReservationExtrasRequestGeneration>({
      generation: 0,
      key: requestKey,
    });
  if (requestGeneration.key !== requestKey) {
    setRequestGeneration({
      generation:
        requestGeneration.generation +
        RESERVATION_EXTRAS_REQUEST.INCREMENT,
      key: requestKey,
    });
  }
  const activeGeneration =
    requestGeneration.key === requestKey
      ? requestGeneration.generation
      : requestGeneration.generation +
        RESERVATION_EXTRAS_REQUEST.INCREMENT;
  return requestKey === null
    ? null
    : JSON.stringify([requestKey, activeGeneration]);
};
