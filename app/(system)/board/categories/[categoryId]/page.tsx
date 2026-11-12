import type { Metadata } from "next";
import { ensureWorkModeChosen } from "@/app/features/access/work-mode/ensureWorkModeChosen";
import CategoryUnits from "@/app/features/board/category-units/CategoryUnits";
import { CATEGORY_UNITS_METADATA } from "@/app/features/board/category-units/constants/CategoryUnitsMetadata.constants";
import { hasOperationsArea } from "@/app/services/operations/hasOperationsArea";

export const metadata: Metadata = CATEGORY_UNITS_METADATA;

const CategoryUnitsPage = async ({
  params,
  searchParams,
}: PageProps<"/board/categories/[categoryId]">): Promise<React.JSX.Element> => {
  await ensureWorkModeChosen();

  const { categoryId } = await params;
  const { page } = await searchParams;
  const canDispatch = await hasOperationsArea();

  return (
    <CategoryUnits
      canDispatch={canDispatch}
      categoryId={categoryId}
      pageParam={page}
    />
  );
};

export default CategoryUnitsPage;
