import type { Metadata } from "next";
import EquipmentHub from "@/app/features/operations/equipment-hub/EquipmentHub";
import { EQUIPMENT_HUB_COPY } from "@/app/features/operations/equipment-hub/constants/EquipmentHubCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: EQUIPMENT_HUB_COPY.HEADING,
};

const OperationsEquipmentPage = async ({
  searchParams,
}: PageProps<"/operations/equipment">): Promise<JSX.Element> => {
  const { currency } = await searchParams;

  return <EquipmentHub currencyParam={currency} />;
};

export default OperationsEquipmentPage;
