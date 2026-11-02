import { renderHook } from "@testing-library/react";
import { usePasswordChangeFormViewModel } from "../hooks/usePasswordChangeFormViewModel";
import { DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS } from "./PasswordChangeFormView.defaults.constants";

export const renderPasswordChangeViewModel = () =>
  renderHook(() =>
    usePasswordChangeFormViewModel(
      DEFAULT_PASSWORD_CHANGE_FORM_VIEW_PROPS
    )
  );
