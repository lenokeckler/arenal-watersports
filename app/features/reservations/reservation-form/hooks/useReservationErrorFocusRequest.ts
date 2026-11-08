import { useState } from "react";

export const useReservationErrorFocusRequest = () => {
  const [errorFocusRequest, setErrorFocusRequest] =
    useState(0);
  const requestErrorFocus = (): void => {
    setErrorFocusRequest(
      (currentRequest) => currentRequest + 1
    );
  };

  return { errorFocusRequest, requestErrorFocus };
};
