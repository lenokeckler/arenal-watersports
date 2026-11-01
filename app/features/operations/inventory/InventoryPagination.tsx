import { Text } from "@/app/components";
import { PAGINATION } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import InventoryPaginationLink from "./components/InventoryPaginationLink";
import { INVENTORY_COPY } from "./constants/InventoryCopy.constants";
import type { InventoryPaginationProps } from "./models/InventoryPaginationProps.interface";
import {
  INVENTORY_PAGINATION_CLASS,
  INVENTORY_PAGINATION_STATUS_CLASS,
} from "./styles/InventoryPagination.styles";

const InventoryPagination = ({
  pageIndex,
  pageCount,
  pagePath,
}: InventoryPaginationProps): NullableRef<React.JSX.Element> => {
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
      <InventoryPaginationLink
        href={pagePath(pageIndex - PAGINATION.ONE_PAGE)}
        isDisabled={isPreviousDisabled}
        label={INVENTORY_COPY.PREVIOUS_PAGE}
      />
      <Text className={INVENTORY_PAGINATION_STATUS_CLASS}>
        {INVENTORY_COPY.PAGE}{" "}
        {pageIndex + PAGINATION.ONE_PAGE}{" "}
        {INVENTORY_COPY.PAGE_OF} {pageCount}
      </Text>
      <InventoryPaginationLink
        href={pagePath(pageIndex + PAGINATION.ONE_PAGE)}
        isDisabled={isNextDisabled}
        label={INVENTORY_COPY.NEXT_PAGE}
      />
    </nav>
  );
};

export default InventoryPagination;
