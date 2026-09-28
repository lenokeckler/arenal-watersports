import CategoryListView from "./CategoryListView";
import type { CategoryListViewProps } from "./models/CategoryListViewProps.interface";
import { listCategories } from "./services/listCategories";

const fetchCategoryListViewProps =
  async (): Promise<CategoryListViewProps> => {
    try {
      const categories = await listCategories();
      return { categories, fetchFailed: false };
    } catch {
      return { categories: [], fetchFailed: true };
    }
  };

const CategoryList =
  async (): Promise<React.JSX.Element> => {
    const categoryListViewProps =
      await fetchCategoryListViewProps();

    return <CategoryListView {...categoryListViewProps} />;
  };

export default CategoryList;
