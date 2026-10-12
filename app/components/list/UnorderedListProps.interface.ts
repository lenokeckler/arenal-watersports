import { UnorderedListVariant } from "./UnorderedList.constants";
import React from "react";

export interface UnorderedListItem {
  text: string | React.JSX.Element;
  id?: string;
}
export interface UnorderedListProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: UnorderedListVariant;
  ariaLabel?: string;
  validationMessages?: string[];
  items?: (string | UnorderedListItem)[];
}
