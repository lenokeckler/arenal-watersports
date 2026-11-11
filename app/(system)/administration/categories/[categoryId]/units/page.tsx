import type { Metadata } from "next";
import { UNIT_LIST_METADATA } from "@/app/features/administration/unit-catalog/constants/UnitCatalogMetadata.constants";
import UnitList from "@/app/features/administration/unit-catalog/UnitList";

export const metadata: Metadata = UNIT_LIST_METADATA;

const UnitsPage = async ({
  params,
  searchParams,
}: PageProps<"/administration/categories/[categoryId]/units">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;
  const { page } = await searchParams;

  return (
    <UnitList
      categoryId={categoryId}
      pageParam={page}
    />
  );
};

export default UnitsPage;
