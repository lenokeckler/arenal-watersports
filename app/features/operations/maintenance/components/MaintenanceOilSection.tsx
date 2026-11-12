import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import UnorderedList from "@/app/components/list/UnorderedList";
import { TitleVariant } from "@/app/constants";
import {
  MAINTENANCE_COPY,
  MAINTENANCE_OIL_HEADING_ID,
} from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import {
  MAINTENANCE_LIST_CLASS,
  MAINTENANCE_MESSAGE_CLASS,
  MAINTENANCE_SECTION_CLASS,
  MAINTENANCE_SECTION_HEADING_CLASS,
} from "../styles/Maintenance.styles";
import MaintenanceOilCard from "./MaintenanceOilCard";
import type { JSX } from "react";

const MaintenanceOilSection = ({
  units,
}: MaintenanceSectionProps): JSX.Element => (
  <Section
    ariaLabel={MAINTENANCE_OIL_HEADING_ID}
    className={MAINTENANCE_SECTION_CLASS}
  >
    <Title
      id={MAINTENANCE_OIL_HEADING_ID}
      variant={TitleVariant.SECONDARY}
      text={MAINTENANCE_COPY.OIL_HEADING}
      className={MAINTENANCE_SECTION_HEADING_CLASS}
    />
    {units.length === 0 ? (
      <Text className={MAINTENANCE_MESSAGE_CLASS}>
        {MAINTENANCE_COPY.OIL_EMPTY}
      </Text>
    ) : (
      <UnorderedList
        className={MAINTENANCE_LIST_CLASS}
        items={units.map((unit) => ({
          id: unit.unitId,
          text: <MaintenanceOilCard unit={unit} />,
        }))}
      />
    )}
  </Section>
);

export default MaintenanceOilSection;
