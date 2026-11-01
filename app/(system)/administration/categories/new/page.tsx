import type { Metadata } from "next";
import CategoryCreateForm from "@/app/components/category-catalog/CategoryCreateForm";
import { CATEGORY_CREATE_FORM_METADATA } from "@/app/components/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata =
  CATEGORY_CREATE_FORM_METADATA;

const CategoryCreatePage = (): React.JSX.Element => (
  <CategoryCreateForm />
);

export default CategoryCreatePage;
