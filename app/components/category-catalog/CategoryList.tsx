import { redirect } from "next/navigation";
import { LENGTH, PATHS } from "@/app/constants";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { CATEGORY_LIST_DIAGNOSTICS } from "./constants/CategoryListDiagnostics.constants";
import CategoryListView from "./CategoryListView";
import type { CategoryListProps } from "./models/CategoryListProps.interface";
import type { CategoryListViewProps } from "./models/CategoryListViewProps.interface";
import { listCategories } from "./services/listCategories";
import { resolveCategoryListPage } from "./utils/resolveCategoryListPage";
import { resolveCategoryListPageHref } from "./utils/resolveCategoryListPageHref";

const fetchCategoryListViewProps = async (
  currentPage: number
): Promise<CategoryListViewProps> => {
  try {
    const { categories, pageCount } =
      await listCategories(currentPage);
    return {
      categories,
      currentPage,
      fetchFailed: false,
      pageCount,
    };
  } catch (error) {
    const fetchError = new Error(
      CATEGORY_LIST_DIAGNOSTICS.FETCH_FAILED,
      { cause: error }
    );
    return {
      categories: [],
      currentPage,
      fetchError,
      fetchFailed: true,
      pageCount: LENGTH.ZERO,
    };
  }
};

const CategoryList = async ({
  pageParam,
}: CategoryListProps): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const categoryListViewProps =
    await fetchCategoryListViewProps(
      resolveCategoryListPage(pageParam)
    );

  if (
    categoryListViewProps.currentPage >
      categoryListViewProps.pageCount &&
    categoryListViewProps.pageCount > LENGTH.ZERO
  ) {
    redirect(
      resolveCategoryListPageHref(
        categoryListViewProps.pageCount
      )
    );
  }

  return <CategoryListView {...categoryListViewProps} />;
};

export default CategoryList;
