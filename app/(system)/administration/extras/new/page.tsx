import type { Metadata } from "next";
import { EXTRA_CREATE_METADATA } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogMetadata.constants";
import ExtraCreateForm from "@/app/features/administration/extra-catalog/ExtraCreateForm";

export const metadata: Metadata = EXTRA_CREATE_METADATA;

const ExtraCreatePage = (): React.JSX.Element => (
  <ExtraCreateForm />
);

export default ExtraCreatePage;
