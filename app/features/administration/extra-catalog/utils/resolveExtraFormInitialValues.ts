import { EXTRA_FORM_INITIAL_VALUES } from "../constants/ExtraFormInitialValues.constants";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
import { mapExtraToFormValues } from "./mapExtraToFormValues";

export const resolveExtraFormInitialValues = (
  props: ExtraFormViewModelProps
): ExtraFormValues =>
  props.mode === EXTRA_FORM_MODE.EDIT
    ? mapExtraToFormValues(props.extra)
    : EXTRA_FORM_INITIAL_VALUES;
