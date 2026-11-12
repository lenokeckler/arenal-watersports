"use client";

import { UnorderedListProps } from "./UnorderedListProps.interface";
import { STRING } from "@/app/constants";
import { useUnorderedListViewModel } from "./hooks/useUnorderedListViewModel";
import { resolveUnorderedListWrapperClassName } from "./styles/UnorderedList.styles";

const UnorderedList = ({
  id,
  role,
  "aria-labelledby": ariaLabelledBy,
  validationMessages,
  items = [],
  variant,
  ariaLabel,
  className = STRING.Empty,
  style = {},
}: UnorderedListProps) => {
  const {
    finalItems,
    listRole,
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
        id={id}
        role={role ?? listRole}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={variantStyles.listClass}
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
