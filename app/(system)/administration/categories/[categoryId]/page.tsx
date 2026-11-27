import type { Metadata } from "next";
import CategoryConfigure from "@/app/features/administration/category-catalog/CategoryConfigure";
import { CATEGORY_CONFIGURE_METADATA } from "@/app/features/administration/category-catalog/constants/CategoryConfigureMetadata.constants";

export const metadata: Metadata =
  CATEGORY_CONFIGURE_METADATA;

const CategoryConfigurePage = async ({
  params,
}: PageProps<"/administration/categories/[categoryId]">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;

  return <CategoryConfigure categoryId={categoryId} />;
};

export default CategoryConfigurePage;
