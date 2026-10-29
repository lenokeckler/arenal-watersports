import type { Metadata } from "next";
import CategoryBehavior from "@/app/components/category-catalog/CategoryBehavior";
import { CATEGORY_BEHAVIOR_FORM_METADATA } from "@/app/components/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata =
  CATEGORY_BEHAVIOR_FORM_METADATA;

const CategoryBehaviorPage = async ({
  params,
}: PageProps<"/administration/categories/[categoryId]/behavior">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;

  return <CategoryBehavior categoryId={categoryId} />;
};

export default CategoryBehaviorPage;
