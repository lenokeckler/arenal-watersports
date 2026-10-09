import { renderHook } from "@testing-library/react";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { usePasswordChangeFormViewModel } from "../hooks/usePasswordChangeFormViewModel";

export const renderPasswordChangeViewModel = () =>
  renderHook(() =>
    usePasswordChangeFormViewModel({
      action: submitFirstPasswordChange,
      errorCopy: FIRST_SIGN_IN_ERROR_COPY,
    })
  );
