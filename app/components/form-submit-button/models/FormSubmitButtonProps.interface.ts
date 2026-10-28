import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";

export interface FormSubmitButtonProps {
  icon: MaterialIconName;
  isPending: boolean;
  label: string;
  name?: string;
  pendingLabel: string;
  showsProgress?: boolean;
  value?: string;
}
