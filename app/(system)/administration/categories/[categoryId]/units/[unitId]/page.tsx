import type { Metadata } from "next";
import { UNIT_EDIT_METADATA } from "@/app/features/administration/unit-catalog/constants/UnitCatalogMetadata.constants";
import UnitEditForm from "@/app/features/administration/unit-catalog/UnitEditForm";

export const metadata: Metadata = UNIT_EDIT_METADATA;

const UnitEditPage = async ({
  params,
  searchParams,
}: PageProps<"/administration/categories/[categoryId]/units/[unitId]">): Promise<React.JSX.Element> => {
  const { categoryId, unitId } = await params;
  const { page } = await searchParams;

  return (
    <UnitEditForm
      categoryId={categoryId}
      unitId={unitId}
      pageParam={page}
    />
  );
};

export default UnitEditPage;
