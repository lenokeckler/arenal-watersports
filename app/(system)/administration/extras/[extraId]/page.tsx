import type { Metadata } from "next";
import { EXTRA_EDIT_METADATA } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogMetadata.constants";
import ExtraEditForm from "@/app/features/administration/extra-catalog/ExtraEditForm";

export const metadata: Metadata = EXTRA_EDIT_METADATA;

const ExtraEditPage = async ({
  params,
}: PageProps<"/administration/extras/[extraId]">): Promise<React.JSX.Element> => {
  const { extraId } = await params;

  return <ExtraEditForm extraId={extraId} />;
};

export default ExtraEditPage;
