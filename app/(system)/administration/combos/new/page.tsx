import type { Metadata } from "next";
import { COMBO_CREATE_METADATA } from "@/app/features/administration/combo-catalog/constants/ComboCatalogMetadata.constants";
import ComboCreateForm from "@/app/features/administration/combo-catalog/ComboCreateForm";

export const metadata: Metadata = COMBO_CREATE_METADATA;

const ComboCreatePage = (): React.JSX.Element => (
  <ComboCreateForm />
);

export default ComboCreatePage;
