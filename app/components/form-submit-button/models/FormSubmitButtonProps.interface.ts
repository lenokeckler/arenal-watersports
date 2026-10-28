import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";

export interface FormSubmitButtonProps {
  icon: MaterialIconName;
  isPending: boolean;
  label: string;
  pendingLabel: string;
}
