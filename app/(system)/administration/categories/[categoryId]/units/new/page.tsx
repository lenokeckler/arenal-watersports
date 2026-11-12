import type { Metadata } from "next";
import { UNIT_CREATE_METADATA } from "@/app/features/administration/unit-catalog/constants/UnitCatalogMetadata.constants";
import UnitCreateForm from "@/app/features/administration/unit-catalog/UnitCreateForm";

export const metadata: Metadata = UNIT_CREATE_METADATA;

const UnitCreatePage = async ({
  params,
}: PageProps<"/administration/categories/[categoryId]/units/new">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;

  return <UnitCreateForm categoryId={categoryId} />;
};

export default UnitCreatePage;
