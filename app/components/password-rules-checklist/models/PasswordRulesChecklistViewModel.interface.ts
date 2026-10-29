import type { UnorderedListItem } from "@/app/components/list/UnorderedListProps.interface";

export interface PasswordRulesChecklistViewModel {
  items: UnorderedListItem[];
  summary: string;
  titleId: string;
}
