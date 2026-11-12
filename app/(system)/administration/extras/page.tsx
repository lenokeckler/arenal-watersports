import type { Metadata } from "next";
import { EXTRA_LIST_METADATA } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogMetadata.constants";
import ExtraList from "@/app/features/administration/extra-catalog/ExtraList";

export const metadata: Metadata = EXTRA_LIST_METADATA;

const ExtrasPage = async ({
  searchParams,
}: PageProps<"/administration/extras">): Promise<React.JSX.Element> => {
  const { page } = await searchParams;

  return <ExtraList pageParam={page} />;
};

export default ExtrasPage;
