import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { LIST_PAGINATION_COPY } from "./constants/ListPaginationCopy.constants";
import type { ListPaginationProps } from "./models/ListPaginationProps.interface";
import {
  LIST_PAGINATION_CLASS,
  LIST_PAGINATION_NEXT_CLASS,
  LIST_PAGINATION_PREVIOUS_CLASS,
  LIST_PAGINATION_STATUS_CLASS,
} from "./styles/ListPagination.styles";

const ListPagination = ({
  basePath,
  currentPage,
  navLabel,
  pageCount,
}: ListPaginationProps): NullableRef<React.JSX.Element> => {
  if (pageCount <= LIST_PAGINATION.FIRST_PAGE) {
    return null;
  }

  return (
    <nav
      aria-label={navLabel}
      className={LIST_PAGINATION_CLASS}
    >
      {currentPage > LIST_PAGINATION.FIRST_PAGE && (
        <Link
          href={resolveListPageHref(
            basePath,
            currentPage - 1
          )}
          className={LIST_PAGINATION_PREVIOUS_CLASS}
        >
          {LIST_PAGINATION_COPY.PREVIOUS}
        </Link>
      )}
      <Text className={LIST_PAGINATION_STATUS_CLASS}>
        {[
          LIST_PAGINATION_COPY.PAGE,
          currentPage,
          LIST_PAGINATION_COPY.OF,
          pageCount,
        ].join(STRING.SPACE)}
      </Text>
      {currentPage < pageCount && (
        <Link
          href={resolveListPageHref(
            basePath,
            currentPage + 1
          )}
          className={LIST_PAGINATION_NEXT_CLASS}
        >
          {LIST_PAGINATION_COPY.NEXT}
        </Link>
      )}
    </nav>
  );
};

export default ListPagination;
