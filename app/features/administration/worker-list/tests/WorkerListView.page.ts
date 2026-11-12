import { screen } from "@testing-library/react";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { ARIA_ROLE, STRING } from "@/app/constants";

export const createWorkerListViewPage = () => ({
  getColumnHeaders: () =>
    screen
      .getAllByRole(ARIA_ROLE.COLUMNHEADER)
      .map(
        (columnHeader) =>
          columnHeader.textContent ?? STRING.Empty
      ),
  getEmptyState: () => screen.getByRole(ARIA_ROLE.STATUS),
  getNextPageLink: () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: LIST_PAGINATION_COPY.NEXT,
    }),
  getTextOccurrences: (text: string) =>
    screen.getAllByText(text, { exact: true }),
  getTitle: (title: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, { name: title }),
});
