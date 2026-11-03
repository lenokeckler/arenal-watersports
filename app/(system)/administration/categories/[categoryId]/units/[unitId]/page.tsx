import type { Metadata } from "next";
import { UNIT_EDIT_METADATA } from "@/app/features/administration/unit-catalog/constants/UnitCatalogMetadata.constants";
import UnitEditForm from "@/app/features/administration/unit-catalog/UnitEditForm";

export const metadata: Metadata = UNIT_EDIT_METADATA;

const UnitEditPage = async ({
  params,
}: PageProps<"/administration/categories/[categoryId]/units/[unitId]">): Promise<React.JSX.Element> => {
  const { categoryId, unitId } = await params;

  return (
    <UnitEditForm
      categoryId={categoryId}
      unitId={unitId}
    />
  );
};

export default UnitEditPage;
