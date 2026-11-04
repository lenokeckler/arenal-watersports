export const CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-000000000001";

export const PAGE_PARAM = "2";

export const MODE_REDIRECT_MESSAGE = "mode-redirect";

export const buildCategoryUnitsPageProps = (
  page?: string
): PageProps<"/board/categories/[categoryId]"> => ({
  params: Promise.resolve({ categoryId: CATEGORY_ID }),
  searchParams: Promise.resolve({ page }),
});
