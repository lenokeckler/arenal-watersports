import type { Metadata } from "next";
import { TARIFF_EDIT_METADATA } from "@/app/features/administration/tariff-catalog/constants/TariffCatalogMetadata.constants";
import TariffEditForm from "@/app/features/administration/tariff-catalog/TariffEditForm";

export const metadata: Metadata = TARIFF_EDIT_METADATA;

const TariffEditPage = async ({
  params,
}: PageProps<"/administration/tariffs/[categoryId]">): Promise<React.JSX.Element> => {
  const { categoryId } = await params;

  return <TariffEditForm categoryId={categoryId} />;
};

export default TariffEditPage;
