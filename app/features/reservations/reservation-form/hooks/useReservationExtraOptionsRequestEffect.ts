import { useEffect, useRef } from "react";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRAS_REQUEST } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";
import { loadReservationExtraOptions } from "../utils/loadReservationExtraOptions";

export const useReservationExtraOptionsRequestEffect = (
  unitId: string,
  requestKey: NullableRef<string>,
  onLoaded: (options: ReservationExtraOption[]) => void,
  onFailed: (error: unknown) => void
): void => {
  const requestId = useRef(0);

  useEffect(() => {
    if (requestKey === null) {
      return undefined;
    }
    const activeRequestId =
      requestId.current +
      RESERVATION_EXTRAS_REQUEST.INCREMENT;
    requestId.current = activeRequestId;
    const loadOptions = async (): Promise<void> => {
      const result =
        await loadReservationExtraOptions(unitId);
      if (requestId.current !== activeRequestId) {
        return;
      }
      if (result.ok) {
        onLoaded(result.options);
        return;
      }
      onFailed(result.error);
    };
    void loadOptions();
    return () => {
      requestId.current +=
        RESERVATION_EXTRAS_REQUEST.INCREMENT;
    };
  }, [onFailed, onLoaded, requestKey, unitId]);
};
