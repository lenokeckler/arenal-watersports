import type { Metadata } from "next";
import CategoryImage from "@/app/features/administration/category-catalog/CategoryImage";
import { CATEGORY_IMAGE_FORM_METADATA } from "@/app/features/administration/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata =
  CATEGORY_IMAGE_FORM_METADATA;

const CategoryImagePage = async ({
  params,
}: PageProps<"/administration/categories/[categoryId]/image">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;

  return <CategoryImage categoryId={categoryId} />;
};

export default CategoryImagePage;
