import type { Metadata } from "next";
import { EXTRA_COMPATIBILITY_CATEGORIES_METADATA } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogMetadata.constants";
import ExtraCompatibilityCategoryList from "@/app/features/administration/extra-catalog/ExtraCompatibilityCategoryList";

export const metadata: Metadata =
  EXTRA_COMPATIBILITY_CATEGORIES_METADATA;

const ExtraCompatibilityPage = async ({
  params,
}: PageProps<"/administration/extras/[extraId]/compatibility">): Promise<React.JSX.Element> => {
  const { extraId } = await params;

  return (
    <ExtraCompatibilityCategoryList extraId={extraId} />
  );
};

export default ExtraCompatibilityPage;
