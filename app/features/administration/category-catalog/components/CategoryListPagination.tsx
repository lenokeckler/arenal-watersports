import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_LIST_PAGINATION } from "../constants/CategoryListPagination.constants";
import type { CategoryListPaginationProps } from "../models/CategoryListPaginationProps.interface";
import {
  CATEGORY_LIST_PAGINATION_CLASS,
  CATEGORY_LIST_PAGINATION_NEXT_CLASS,
  CATEGORY_LIST_PAGINATION_PREVIOUS_CLASS,
  CATEGORY_LIST_PAGINATION_STATUS_CLASS,
} from "../styles/CategoryListPagination.styles";
import { resolveCategoryListPageHref } from "../utils/resolveCategoryListPageHref";

const CategoryListPagination = ({
  currentPage,
  pageCount,
}: CategoryListPaginationProps): NullableRef<React.JSX.Element> => {
  if (pageCount <= CATEGORY_LIST_PAGINATION.FIRST_PAGE) {
    return null;
  }

  return (
    <nav
      aria-label={
        CATEGORY_CATALOG_COPY.PAGINATION_NAV_LABEL
      }
      className={CATEGORY_LIST_PAGINATION_CLASS}
    >
      {currentPage >
        CATEGORY_LIST_PAGINATION.FIRST_PAGE && (
        <Link
          href={resolveCategoryListPageHref(
            currentPage - 1
          )}
          className={
            CATEGORY_LIST_PAGINATION_PREVIOUS_CLASS
          }
        >
          {CATEGORY_CATALOG_COPY.PAGINATION_PREVIOUS}
        </Link>
      )}
      <Text
        className={CATEGORY_LIST_PAGINATION_STATUS_CLASS}
      >
        {[
          CATEGORY_CATALOG_COPY.PAGINATION_PAGE,
          currentPage,
          CATEGORY_CATALOG_COPY.PAGINATION_OF,
          pageCount,
        ].join(STRING.SPACE)}
      </Text>
      {currentPage < pageCount && (
        <Link
          href={resolveCategoryListPageHref(
            currentPage + 1
          )}
          className={CATEGORY_LIST_PAGINATION_NEXT_CLASS}
        >
          {CATEGORY_CATALOG_COPY.PAGINATION_NEXT}
        </Link>
      )}
    </nav>
  );
};

export default CategoryListPagination;
