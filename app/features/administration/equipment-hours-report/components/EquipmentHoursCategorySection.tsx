import { Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import type { EquipmentHoursCategorySectionProps } from "../models/EquipmentHoursComponentProps.interface";
import {
  EQUIPMENT_HOURS_LIST_CLASS,
  EQUIPMENT_HOURS_SECTION_CLASS,
  EQUIPMENT_HOURS_SECTION_TITLE_CLASS,
} from "../styles/EquipmentHoursReport.styles";
import EquipmentHoursRow from "./EquipmentHoursRow";

const EquipmentHoursCategorySection = ({
  category,
}: EquipmentHoursCategorySectionProps): React.JSX.Element => {
  const largestHours = Math.max(
    ...category.units.map((unit) => unit.hours),
    0
  );

  return (
    <section className={EQUIPMENT_HOURS_SECTION_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={category.name}
        className={EQUIPMENT_HOURS_SECTION_TITLE_CLASS}
      />
      <ul className={EQUIPMENT_HOURS_LIST_CLASS}>
        {category.units.map((unit) => (
          <EquipmentHoursRow
            key={unit.unitId}
            largestHours={largestHours}
            unit={unit}
          />
        ))}
      </ul>
    </section>
  );
};

export default EquipmentHoursCategorySection;
