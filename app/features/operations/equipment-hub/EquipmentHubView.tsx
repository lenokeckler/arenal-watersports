import ScreenBack from "@/app/components/screen-back/ScreenBack";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import EquipmentHubCards from "./components/EquipmentHubCards";
import EquipmentHubCharts from "./components/EquipmentHubCharts";
import { EQUIPMENT_HUB_COPY } from "./constants/EquipmentHubCopy.constants";
import type { EquipmentHubViewProps } from "./models/EquipmentHubViewProps.interface";
import {
  EQUIPMENT_HUB_CLASS,
  EQUIPMENT_HUB_DESCRIPTION_CLASS,
  EQUIPMENT_HUB_HEADING_CLASS,
  EQUIPMENT_HUB_MESSAGE_CLASS,
} from "./styles/EquipmentHub.styles";
import type { JSX } from "react";

const EquipmentHubView = ({
  currency,
  data,
  errorMessage,
}: EquipmentHubViewProps): JSX.Element => (
  <main className={EQUIPMENT_HUB_CLASS}>
    <ScreenBack fallbackHref={PATHS.BOARD} />
    <div>
      <Title
        variant={TitleVariant.PRIMARY}
        text={EQUIPMENT_HUB_COPY.HEADING}
        className={EQUIPMENT_HUB_HEADING_CLASS}
      />
      <Text className={EQUIPMENT_HUB_DESCRIPTION_CLASS}>
        {EQUIPMENT_HUB_COPY.DESCRIPTION}
      </Text>
    </div>
    {data ? (
      <>
        <EquipmentHubCards data={data} />
        <EquipmentHubCharts
          currency={currency}
          data={data}
        />
      </>
    ) : (
      <Text
        className={EQUIPMENT_HUB_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
  </main>
);

export default EquipmentHubView;
