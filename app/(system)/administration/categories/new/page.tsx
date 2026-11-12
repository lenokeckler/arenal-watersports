import type { Metadata } from "next";
import CategoryCreateForm from "@/app/features/administration/category-catalog/CategoryCreateForm";
import { CATEGORY_CREATE_FORM_METADATA } from "@/app/features/administration/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata =
  CATEGORY_CREATE_FORM_METADATA;

const CategoryCreatePage = (): React.JSX.Element => (
  <CategoryCreateForm />
);

export default CategoryCreatePage;
