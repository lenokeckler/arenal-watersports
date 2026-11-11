import type { AriaRole } from "react";
import { UnorderedListItem } from "../UnorderedListProps.interface";

export interface UnorderedListViewModel {
  finalVariant: string;
  finalItems: (string | UnorderedListItem)[];
  variantStyles: {
    containerClass: string;
    listClass: string;
    itemClass: string;
  };
  listRole: AriaRole | undefined;
  styleClasses: string;
  shouldRender: boolean;
}
