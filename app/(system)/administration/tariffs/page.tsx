import type { Metadata } from "next";
import { TARIFF_LIST_METADATA } from "@/app/features/administration/tariff-catalog/constants/TariffCatalogMetadata.constants";
import TariffList from "@/app/features/administration/tariff-catalog/TariffList";

export const metadata: Metadata = TARIFF_LIST_METADATA;

const TariffsPage = (): React.JSX.Element => <TariffList />;

export default TariffsPage;
