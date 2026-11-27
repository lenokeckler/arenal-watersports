import { EQUIPMENT_CURRENCIES } from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import EquipmentHubView from "./EquipmentHubView";
import { EQUIPMENT_HUB_COPY } from "./constants/EquipmentHubCopy.constants";
import type { EquipmentHubData } from "./models/EquipmentHubData.interface";
import type { EquipmentHubProps } from "./models/EquipmentHubProps.interface";
import { getEquipmentHub } from "./services/getEquipmentHub";
import type { JSX } from "react";

const EquipmentHub = async ({
  currencyParam,
}: EquipmentHubProps = {}): Promise<JSX.Element> => {
  let data: NullableRef<EquipmentHubData> = null;
  let errorMessage: NullableRef<string> = null;

  try {
    data = await getEquipmentHub();
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? EQUIPMENT_HUB_COPY.FORBIDDEN
        : EQUIPMENT_HUB_COPY.ERROR;
  }

  return (
    <EquipmentHubView
      currency={
        resolveQueryChoice(
          currencyParam,
          EQUIPMENT_CURRENCIES
        ) ?? EQUIPMENT_CURRENCIES[0]
      }
      data={data}
      errorMessage={errorMessage}
    />
  );
};

export default EquipmentHub;
