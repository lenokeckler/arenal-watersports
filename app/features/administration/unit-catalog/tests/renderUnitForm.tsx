import { render } from "@testing-library/react";
import type { UnitFormViewProps } from "../models/UnitFormViewProps.interface";
import UnitFormView from "../UnitFormView";
import { createUnitFormPage } from "./UnitForm.page";
import { buildUnitFormViewProps } from "./UnitForm.constants";

export const renderUnitForm = (
  overrides: Partial<UnitFormViewProps> = {}
) => {
  const props = buildUnitFormViewProps(overrides);
  render(<UnitFormView {...props} />);
  return createUnitFormPage(props.mode);
};
