import { UnorderedListItem } from "../UnorderedListProps.interface";

export interface UnorderedListViewModel {
  finalVariant: string;
  finalItems: (string | UnorderedListItem)[];
  variantStyles: {
    containerClass: string;
    listClass: string;
    itemClass: string;
  };
  styleClasses: string;
  shouldRender: boolean;
}
