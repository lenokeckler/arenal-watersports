import type { Metadata } from "next";
import CategoryList from "@/app/features/administration/category-catalog/CategoryList";
import { CATEGORY_LIST_METADATA } from "@/app/features/administration/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata = CATEGORY_LIST_METADATA;

const CategoriesPage = async ({
  searchParams,
}: PageProps<"/administration/categories">): Promise<React.JSX.Element> => {
  const { page } = await searchParams;

  return <CategoryList pageParam={page} />;
};

export default CategoriesPage;
