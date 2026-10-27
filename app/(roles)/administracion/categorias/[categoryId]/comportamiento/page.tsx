import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryBehaviorForm from "@/app/components/category-catalog/CategoryBehaviorForm";
import { CATEGORY_BEHAVIOR_FORM_METADATA } from "@/app/components/category-catalog/constants/CategoryCatalogMetadata.constants";
import { getCategoryBehavior } from "@/app/components/category-catalog/services/getCategoryBehavior";

export const metadata: Metadata =
  CATEGORY_BEHAVIOR_FORM_METADATA;

const CategoryBehaviorPage = async ({
  params,
}: PageProps<"/administracion/categorias/[categoryId]/comportamiento">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;
  const behavior = await getCategoryBehavior(categoryId);

  if (!behavior) {
    notFound();
  }

  return (
    <main>
      <CategoryBehaviorForm behavior={behavior} />
    </main>
  );
};

export default CategoryBehaviorPage;
