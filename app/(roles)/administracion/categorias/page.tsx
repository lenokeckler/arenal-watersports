import type { Metadata } from "next";
import CategoryList from "@/app/components/category-catalog/CategoryList";
import { CATEGORY_LIST_METADATA } from "@/app/components/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata = CATEGORY_LIST_METADATA;

const CategoriesPage = (): React.JSX.Element => (
  <main>
    <CategoryList />
  </main>
);

export default CategoriesPage;
