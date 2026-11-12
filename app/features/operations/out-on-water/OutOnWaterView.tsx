import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import OutOnWaterList from "./components/OutOnWaterList";
import {
  OUT_ON_WATER_COPY,
  OUT_ON_WATER_HEADING_ID,
} from "./constants/OutOnWaterCopy.constants";
import type { OutOnWaterViewProps } from "./models/OutOnWaterViewProps.interface";
import {
  OUT_ON_WATER_CLASS,
  OUT_ON_WATER_HEADING_CLASS,
  OUT_ON_WATER_MESSAGE_CLASS,
  OUT_ON_WATER_SECTION_CLASS,
} from "./styles/OutOnWater.styles";
import type { JSX } from "react";

const OutOnWaterView = ({
  errorMessage,
  groups,
  nowIso,
}: OutOnWaterViewProps): JSX.Element => (
  <main className={OUT_ON_WATER_CLASS}>
    <Section
      ariaLabel={OUT_ON_WATER_HEADING_ID}
      className={OUT_ON_WATER_SECTION_CLASS}
    >
      <Title
        id={OUT_ON_WATER_HEADING_ID}
        variant={TitleVariant.PRIMARY}
        text={OUT_ON_WATER_COPY.HEADING}
        className={OUT_ON_WATER_HEADING_CLASS}
      />
      {errorMessage && (
        <Text
          className={OUT_ON_WATER_MESSAGE_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {errorMessage}
        </Text>
      )}
      {!errorMessage && groups.length === 0 && (
        <Text className={OUT_ON_WATER_MESSAGE_CLASS}>
          {OUT_ON_WATER_COPY.EMPTY}
        </Text>
      )}
      {!errorMessage && groups.length > 0 && (
        <OutOnWaterList
          groups={groups}
          initialNowIso={nowIso}
        />
      )}
    </Section>
  </main>
);

export default OutOnWaterView;
