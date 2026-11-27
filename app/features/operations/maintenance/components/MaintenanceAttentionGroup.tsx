import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { MaintenanceAttentionGroupProps } from "../models/MaintenanceAttentionGroupProps.interface";
import { MAINTENANCE_SECTION_HEADING_CLASS } from "../styles/Maintenance.styles";
import MaintenanceAttentionRow from "./MaintenanceAttentionRow";
import type { JSX } from "react";

const MaintenanceAttentionGroup = ({
  heading,
  units,
}: MaintenanceAttentionGroupProps): NullableRef<JSX.Element> =>
  units.length === 0 ? null : (
    <>
      <Title
        variant={TitleVariant.SECONDARY}
        text={`${heading} (${units.length})`}
        className={MAINTENANCE_SECTION_HEADING_CLASS}
      />
      {units.map((unit) => (
        <MaintenanceAttentionRow
          key={unit.unitId}
          unit={unit}
        />
      ))}
    </>
  );

export default MaintenanceAttentionGroup;
