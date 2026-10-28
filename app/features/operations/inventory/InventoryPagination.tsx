import { InlineText, Link, Text } from "@/app/components";
import { PAGINATION } from "@/app/constants";
import { INVENTORY_COPY } from "./constants/InventoryCopy.constants";
import type { InventoryPaginationProps } from "./models/InventoryPaginationProps.interface";
import {
  INVENTORY_PAGINATION_CLASS,
  INVENTORY_PAGINATION_STATUS_CLASS,
  resolveInventoryPaginationLinkClassName,
} from "./styles/InventoryPagination.styles";

const InventoryPagination = ({
  pageIndex,
  pageCount,
  pagePath,
}: InventoryPaginationProps): React.JSX.Element | null => {
  if (pageCount <= PAGINATION.ONE_PAGE) {
    return null;
  }

  const isPreviousDisabled =
    pageIndex <= PAGINATION.DEFAULT_PAGE;
  const isNextDisabled =
    pageIndex >= pageCount - PAGINATION.ONE_PAGE;

  return (
    <nav
      aria-label={INVENTORY_COPY.PAGINATION_LABEL}
      className={INVENTORY_PAGINATION_CLASS}
    >
      {isPreviousDisabled ? (
        <InlineText
          className={resolveInventoryPaginationLinkClassName(
            isPreviousDisabled
          )}
        >
          {INVENTORY_COPY.PREVIOUS_PAGE}
        </InlineText>
      ) : (
        <Link
          href={pagePath(pageIndex - PAGINATION.ONE_PAGE)}
          className={resolveInventoryPaginationLinkClassName(
            isPreviousDisabled
          )}
        >
          {INVENTORY_COPY.PREVIOUS_PAGE}
        </Link>
      )}
      <Text className={INVENTORY_PAGINATION_STATUS_CLASS}>
        {INVENTORY_COPY.PAGE}{" "}
        {pageIndex + PAGINATION.ONE_PAGE}{" "}
        {INVENTORY_COPY.PAGE_OF} {pageCount}
      </Text>
      {isNextDisabled ? (
        <InlineText
          className={resolveInventoryPaginationLinkClassName(
            isNextDisabled
          )}
        >
          {INVENTORY_COPY.NEXT_PAGE}
        </InlineText>
      ) : (
        <Link
          href={pagePath(pageIndex + PAGINATION.ONE_PAGE)}
          className={resolveInventoryPaginationLinkClassName(
            isNextDisabled
          )}
        >
          {INVENTORY_COPY.NEXT_PAGE}
        </Link>
      )}
    </nav>
  );
};

export default InventoryPagination;
