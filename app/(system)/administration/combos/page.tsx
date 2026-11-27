import type { Metadata } from "next";
import { COMBO_LIST_METADATA } from "@/app/features/administration/combo-catalog/constants/ComboCatalogMetadata.constants";
import ComboList from "@/app/features/administration/combo-catalog/ComboList";

export const metadata: Metadata = COMBO_LIST_METADATA;

const CombosPage = (): React.JSX.Element => <ComboList />;

export default CombosPage;
