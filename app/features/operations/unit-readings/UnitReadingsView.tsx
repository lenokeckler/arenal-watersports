import UnorderedList from "@/app/components/list/UnorderedList";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import UnitReadingCard from "./components/UnitReadingCard";
import {
  UNIT_READINGS_COPY,
  UNIT_READINGS_HEADING_ID,
} from "./constants/UnitReadingsCopy.constants";
import type { UnitReadingsViewProps } from "./models/UnitReadingsViewProps.interface";
import {
  UNIT_READINGS_CLASS,
  UNIT_READINGS_HEADING_CLASS,
  UNIT_READINGS_LIST_CLASS,
  UNIT_READINGS_MESSAGE_CLASS,
} from "./styles/UnitReadings.styles";
import type { JSX } from "react";

const UnitReadingsView = ({
  errorMessage,
  units,
}: UnitReadingsViewProps): JSX.Element => (
  <main className={UNIT_READINGS_CLASS}>
    <Title
      id={UNIT_READINGS_HEADING_ID}
      variant={TitleVariant.PRIMARY}
      text={UNIT_READINGS_COPY.HEADING}
      className={UNIT_READINGS_HEADING_CLASS}
    />
    {errorMessage && (
      <Text
        className={UNIT_READINGS_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
    {!errorMessage && units.length === 0 && (
      <Text className={UNIT_READINGS_MESSAGE_CLASS}>
        {UNIT_READINGS_COPY.EMPTY}
      </Text>
    )}
    {!errorMessage && units.length > 0 && (
      <UnorderedList
        className={UNIT_READINGS_LIST_CLASS}
        items={units.map((unit) => ({
          id: unit.id,
          text: <UnitReadingCard unit={unit} />,
        }))}
      />
    )}
  </main>
);

export default UnitReadingsView;
