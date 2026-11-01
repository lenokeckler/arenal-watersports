import type { Metadata } from "next";
import CategoryDeposit from "@/app/features/administration/category-catalog/CategoryDeposit";
import { CATEGORY_DEPOSIT_FORM_METADATA } from "@/app/features/administration/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata =
  CATEGORY_DEPOSIT_FORM_METADATA;

const CategoryDepositPage = async ({
  params,
}: PageProps<"/administration/categories/[categoryId]/deposit">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;

  return <CategoryDeposit categoryId={categoryId} />;
};

export default CategoryDepositPage;
