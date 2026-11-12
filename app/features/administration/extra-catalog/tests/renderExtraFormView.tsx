import { render } from "@testing-library/react";
import ExtraFormView from "../ExtraFormView";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
import { createExtraFormPage } from "./ExtraForm.page";

export const renderExtraFormView = (
  props: ExtraFormViewModelProps
) => {
  render(<ExtraFormView {...props} />);
  return createExtraFormPage(props.mode);
};
