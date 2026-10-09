import { renderHook } from "@testing-library/react";
import { submitFirstPasswordChange } from "../actions/submitFirstPasswordChange";
import { usePasswordChangeFormViewModel } from "../hooks/usePasswordChangeFormViewModel";

export const renderPasswordChangeViewModel = () =>
  renderHook(() =>
    usePasswordChangeFormViewModel({
      action: submitFirstPasswordChange,
    })
  );
