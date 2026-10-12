"use client";

import { UnorderedListProps } from "./UnorderedListProps.interface";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { UNORDERED_LIST } from "./UnorderedList.constants";
import { useUnorderedListViewModel } from "./hooks/useUnorderedListViewModel";
import { resolveUnorderedListWrapperClassName } from "./styles/UnorderedList.styles";

const UnorderedList = ({
  validationMessages,
  items = [],
  variant,
  ariaLabel,
  className = STRING.Empty,
  style = {},
}: UnorderedListProps) => {
  const {
    finalItems,
    finalVariant,
    variantStyles,
    styleClasses,
  } = useUnorderedListViewModel({
    validationMessages,
    items,
    variant,
    style,
  });
  return (
    <div
      className={resolveUnorderedListWrapperClassName(
        className,
        styleClasses,
        variantStyles.containerClass
      )}
      style={style}
    >
      <ul
        className={variantStyles.listClass}
        role={
          finalVariant === UNORDERED_LIST.VARIANTS.PLAIN
            ? ARIA_ROLE.LIST
            : undefined
        }
        aria-label={ariaLabel}
      >
        {finalItems.map((item, index) => {
          const text =
            typeof item === "string" ? item : item.text;
          const key =
            typeof item === "string"
              ? index
              : item.id || index;
          return (
            <li
              key={key}
              className={variantStyles.itemClass}
            >
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default UnorderedList;
