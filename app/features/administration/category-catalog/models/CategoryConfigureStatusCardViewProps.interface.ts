import type { CategoryConfigureStatusCardProps } from "./CategoryConfigureStatusCardProps.interface";

export interface CategoryConfigureStatusCardViewProps extends CategoryConfigureStatusCardProps {
  onToggleActive: () => void;
}
