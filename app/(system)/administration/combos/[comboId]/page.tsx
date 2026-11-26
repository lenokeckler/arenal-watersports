import type { Metadata } from "next";
import { COMBO_EDIT_METADATA } from "@/app/features/administration/combo-catalog/constants/ComboCatalogMetadata.constants";
import ComboEditForm from "@/app/features/administration/combo-catalog/ComboEditForm";

export const metadata: Metadata = COMBO_EDIT_METADATA;

const ComboEditPage = async ({
  params,
}: PageProps<"/administration/combos/[comboId]">): Promise<React.JSX.Element> => {
  const { comboId } = await params;

  return <ComboEditForm comboId={comboId} />;
};

export default ComboEditPage;
