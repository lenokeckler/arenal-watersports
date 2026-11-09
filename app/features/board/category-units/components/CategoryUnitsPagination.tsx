import { Link, Text } from "@/app/components";
import type { NullableRef } from "@/app/types";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsPaginationProps } from "../models/CategoryUnitsPaginationProps.interface";
import {
  CATEGORY_UNITS_PAGINATION_CLASS,
  CATEGORY_UNITS_PAGINATION_NEXT_CLASS,
  CATEGORY_UNITS_PAGINATION_PREVIOUS_CLASS,
  CATEGORY_UNITS_PAGINATION_STATUS_CLASS,
} from "../styles/CategoryUnits.styles";

const CategoryUnitsPagination = ({
  basePath,
  currentPage,
  pageCount,
}: CategoryUnitsPaginationProps): NullableRef<React.JSX.Element> => {
  if (pageCount <= LIST_PAGINATION.FIRST_PAGE) {
    return null;
  }

  return (
    <nav
      aria-label={CATEGORY_UNITS_COPY.PAGINATION_NAV_LABEL}
      className={CATEGORY_UNITS_PAGINATION_CLASS}
    >
      {currentPage > LIST_PAGINATION.FIRST_PAGE && (
        <Link
          href={resolveListPageHref(
            basePath,
            currentPage - 1
          )}
          className={
            CATEGORY_UNITS_PAGINATION_PREVIOUS_CLASS
          }
        >
          {CATEGORY_UNITS_COPY.PAGINATION_PREVIOUS}
        </Link>
      )}
      <Text
        className={CATEGORY_UNITS_PAGINATION_STATUS_CLASS}
      >
        {CATEGORY_UNITS_COPY.PAGINATION_PAGE_OF(
          currentPage,
          pageCount
        )}
      </Text>
      {currentPage < pageCount && (
        <Link
          href={resolveListPageHref(
            basePath,
            currentPage + 1
          )}
          className={CATEGORY_UNITS_PAGINATION_NEXT_CLASS}
        >
          {CATEGORY_UNITS_COPY.PAGINATION_NEXT}
        </Link>
      )}
    </nav>
  );
};

export default CategoryUnitsPagination;
