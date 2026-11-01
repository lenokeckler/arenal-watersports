import type { Metadata } from "next";
import CategoryAlerts from "@/app/features/administration/category-catalog/CategoryAlerts";
import { CATEGORY_ALERT_FORM_METADATA } from "@/app/features/administration/category-catalog/constants/CategoryCatalogMetadata.constants";

export const metadata: Metadata =
  CATEGORY_ALERT_FORM_METADATA;

const CategoryAlertsPage = async ({
  params,
}: PageProps<"/administration/categories/[categoryId]/alerts">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;

  return <CategoryAlerts categoryId={categoryId} />;
};

export default CategoryAlertsPage;
