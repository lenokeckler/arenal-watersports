import type { Metadata } from "next";
import { EXTRA_COMPATIBILITY_UNITS_METADATA } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogMetadata.constants";
import ExtraCompatibilityUnitsForm from "@/app/features/administration/extra-catalog/ExtraCompatibilityUnitsForm";

export const metadata: Metadata =
  EXTRA_COMPATIBILITY_UNITS_METADATA;

const ExtraCompatibilityUnitsPage = async ({
  params,
}: PageProps<"/administration/extras/[extraId]/compatibility/[categoryId]">): Promise<React.JSX.Element> => {
  const { categoryId, extraId } = await params;

  return (
    <ExtraCompatibilityUnitsForm
      categoryId={categoryId}
      extraId={extraId}
    />
  );
};

export default ExtraCompatibilityUnitsPage;
