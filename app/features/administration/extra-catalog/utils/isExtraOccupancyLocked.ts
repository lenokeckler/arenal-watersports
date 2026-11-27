import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";

export const isExtraOccupancyLocked = (
  props: ExtraFormViewModelProps
): boolean =>
  props.mode === EXTRA_FORM_MODE.EDIT &&
  props.extra.isUsedInReservations;
