import { useMemo } from "react";
import { formatMessages } from "../utils/formatMessages";
import { UNORDERED_LIST } from "../UnorderedList.constants";
import {
  UnorderedListProps,
  UnorderedListItem,
} from "../UnorderedListProps.interface";
import { UnorderedListViewModel } from "../models/UnorderedListViewModel.interface";
import {
  resolveUnorderedListStyleClassName,
  resolveUnorderedListVariantStyles,
} from "../styles/UnorderedList.styles";

export const useUnorderedListViewModel = ({
  validationMessages,
  items = [],
  variant = UNORDERED_LIST.VARIANTS.DEFAULT,
  style = {},
}: UnorderedListProps): UnorderedListViewModel => {
  const viewModel = useMemo(() => {
    const finalVariant = validationMessages
      ? UNORDERED_LIST.VARIANTS.VALIDATION
      : variant;
    let finalItems: (string | UnorderedListItem)[] = [];

    if (
      finalVariant === UNORDERED_LIST.VARIANTS.VALIDATION &&
      validationMessages
    ) {
      if (Array.isArray(validationMessages)) {
        const formattedMessage = formatMessages(
          validationMessages
        );
        if (formattedMessage) {
          finalItems = [formattedMessage];
        }
      }
    } else {
      finalItems = items;
    }
    const shouldRender =
      finalItems && finalItems.length > 0;
    const variantStyles =
      resolveUnorderedListVariantStyles(finalVariant);
    const styleClasses =
      resolveUnorderedListStyleClassName(style);

    return {
      finalVariant,
      finalItems,
      variantStyles,
      styleClasses,
      shouldRender,
    };
  }, [validationMessages, items, variant, style]);
  return viewModel;
};
