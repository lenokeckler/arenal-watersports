import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { FormSubmitButtonProps } from "../models/FormSubmitButtonProps.interface";
import {
  IDLE_LABEL,
  PENDING_LABEL,
} from "./FormSubmitButton.constants";

export const DEFAULT_PROPS: FormSubmitButtonProps = {
  icon: MATERIAL_ICON_NAME.LOCK_RESET,
  isPending: false,
  label: IDLE_LABEL,
  pendingLabel: PENDING_LABEL,
};
